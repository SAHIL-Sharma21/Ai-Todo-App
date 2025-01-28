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