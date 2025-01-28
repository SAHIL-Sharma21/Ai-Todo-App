//Tools for our TODO app
import { ilike, eq } from "drizzle-orm";
import { db } from "./db/index";
import { todosTable } from "./db/schema";
import OpenAI from "openai";

const openAi = new OpenAI();

async function getAllTodos() {
  const todos = await db.select().from(todosTable);

  if (!todos) {
    throw new Error("No todos found kindly add some");
  }
  return todos;
}

async function createTodo(todo) {
  await db.insert(todosTable).values({
    todo,
  });
}

async function searchTodo(search) {
  const todo = await db
    .select()
    .from(todosTable)
    .where(ilike(todosTable.todo, search));

  if (!todo) {
    throw new Error("no todo found with given parameter");
  }
  return todo;
}


async function deleteById(id) {
    await db.delete(todosTable).where(eq(todosTable.id, id));
}


//system prompt

const SYSTEM_PROMPT = `
    You are an AI To-Do List Assistent. You can manage tasks by adding, viewing, updating, and deleting todos.
    You must strictly follow the JOSN output format.

    TODO DB Schema:
    id: Int and Primary key
    todo: String
    created_at: Date Time
    updated_at: Date Time


    Available Tools:
    - getAllTodos(): Return all the todos from Database.
    - createTodo(todo: string): Creates a new todo in the DB and takes todo as a string.
    - deleteById(id: string):  Delete the todo by ID given in the DB
    - searchTodo(search: string): Searches for all todos matching the query string using ilike operator. 

`;