import axios from "axios";
import type { Todo, Category } from "../types";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

//getTodo
export const getTodo = async (page = 1, search = "") => {
  const res = await api.get("/todos", {
    params: { page, per_page: 10, search }
  });
  return res.data;
};

//createTodo
export const createTodo = async (data: Partial<Todo>): Promise<Todo> => {
  const res = await api.post<Todo>("/todos", data);
  return res.data;
};

//deleteTodo
export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};

//updateTodo
export const updateTodo = async (
  id: number,
  data: Partial<Todo>
): Promise<Todo> => {
  const res = await api.put(`/todos/${id}`, data);
  return res.data;
};

//createCategory
export const createCategory = async (
  data: Partial<Category>
): Promise<Category> => {
  const res = await api.post<Category>("/categories", data);
  return res.data;
};

//delete Category
export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};

//updateCategory
export const updateCategory = async (
  id: number,
  data: Partial<Category>
): Promise<Category> => {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
};

//getCategory
export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("/categories");
  return res.data;
};
