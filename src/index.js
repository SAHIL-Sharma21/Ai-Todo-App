//Tools for our TODO app
import { ilike, eq } from "drizzle-orm";
import { db } from "./db/index.js";
import { todosTable } from "./db/schema.js";
// import OpenAI from "openai";
import readlineSync from 'readline-sync';
import {GoogleGenerativeAI} from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env'
});

// const client = new OpenAI();

//system prompt
const SYSTEM_PROMPT = `
    You are an AI To-Do List Assistent with START, PLAN, ACTION, Observation and Output state.
    Wait for the user prompt and first PLAN using available tools.
    After Planning, Take the action with appropriate tools and wait for Observation based Action.
    Once you get the Observations, Return the AI response based on START prompt and observations

    You can manage tasks by adding, viewing, updating, and deleting todos.
    You must strictly follow the JOSN output format.

    TODO DB Schema:
    id: Int and Primary key
    todo: String
    created_at: Date Time
    updated_at: Date Time

    Available Tools:
    - getAllTodos(): Return all the todos from Database.
    - createTodo(todo: string): Creates a new todo in the DB and takes todo as a string and returns the ID of the created todo.
    - deleteById(id: string):  Delete the todo by ID given in the DB.
    - searchTodo(search: string): Searches for all todos matching the query string using ilike operator. 

    Example:
    START
    {"type":"user", "user": "Add a task for shopping groceries."}
    {"type":"plan", "plan": "I will try to get more context on what user needs to shop."}
    {"type":"output", "output": "Can you tell me what all items you want shop for?"}
    {"type":"user", "user": "I want to shop for milk, chocolate, protien powder."}
    {"type":"plan", "plan": "I will use createTodo to create a new Todo in DB."}
    {"type":"action", "function": "createTodo", "input": "shopping for milk, chocolate, protien powder."}
    {"type":"observation", "observation": "2"}
    {"type":"output", "output": "your todo has been added successfully."}
`;

const googleClient = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = googleClient.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: {
    role: "system",
    parts: [{text: SYSTEM_PROMPT}]
  },
  generationConfig: {
    responseMimeType: "application/json"
  }
});

async function getAllTodos() {
  const todos = await db.select().from(todosTable);

  if (!todos) {
    throw new Error("No todos found kindly add some");
  }
  return todos;
}

async function createTodo(todo) {
  const [result] = await db.insert(todosTable).values({
    todo,
  }).returning({
    id: todosTable.id
  });

  return result.id;
}

async function searchTodo(search) {
  const todo = await db
    .select()
    .from(todosTable)
    .where(ilike(todosTable.todo, `%${search}%`));

  if (!todo) {
    throw new Error("no todo found with given parameter");
  }
  return todo;
}


async function deleteById(id) {
    await db.delete(todosTable).where(eq(todosTable.id, id));
}

const tools = {
  getAllTodos: getAllTodos,
  createTodo: createTodo,
  searchTodo: searchTodo,
  deleteById: deleteById
}

// const messages  = [{role: 'system', content: SYSTEM_PROMPT}];
const conversationHistory = [];
let chatSession = null;


while(true){
  const query = readlineSync.question(">> ");
  const userMessage = {
    type: 'user',
    user: query,
  }

  // messages.push({role: 'user', content: JSON.stringify(userMessage)});
  conversationHistory.push(JSON.stringify(userMessage));

  let outputRecieved = false;

  //auto prompting
  while(!outputRecieved){
    try {
      //Start or continue chat session
      if(!chatSession){
        chatSession = model.startChat({
          history: conversationHistory.map(msg => ({
            role: 'user',
            parts: [{text: msg}]
          }))
        });
      }

      const result = await chatSession.sendMessage(conversationHistory[conversationHistory.length - 1]);
      const response = result.response;
      const responseText = response.text().trim();


      //parse and handle response
      const action = JSON.parse(responseText);
      conversationHistory.push(responseText);

      if(action.type === 'output'){
        console.log(`🤖: ${action.output}`);
        outputRecieved = true;
        chatSession = null;
      } else if(action.type === 'action'){
        const fn = tools[action.function];
        if(!fn) throw new Error("Invalid tool call");

        const observation = await fn(action.input);
        const observationMessage = JSON.stringify({
          type: 'observation',
          observation: observation,
        });

        conversationHistory.push(observationMessage);
      }
    } catch (error) {
      console.error("Error: ", error.message);
      break;
    }
  }
}
