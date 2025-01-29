//Tools for our TODO app
import readlineSync from 'readline-sync';
import { model } from "./ai-services/gemini.js";
import { getAllTodos, createTodo, searchTodo, deleteById } from './tools.js';
 

const tools = {
  getAllTodos: getAllTodos,
  createTodo: createTodo,
  searchTodo: searchTodo,
  deleteById: deleteById
}

const conversationHistory = [];
let chatSession = null;

//main thread from here
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
