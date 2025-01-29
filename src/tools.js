//all AI tools for interaction to database
import { ilike, eq } from "drizzle-orm";
import { db } from "./db/index.js";
import { todosTable } from "./db/schema.js";

async function getAllTodos() {
  const todos = await db.select().from(todosTable);

  if (!todos) {
    throw new Error("No todos found kindly add some");
  }
  return todos;
}

async function createTodo(todo) {
  const [result] = await db
    .insert(todosTable)
    .values({
      todo,
    })
    .returning({
      id: todosTable.id,
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

export { getAllTodos, createTodo, searchTodo, deleteById };
