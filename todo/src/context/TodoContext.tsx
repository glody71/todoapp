// TodoContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import type { Todo, Category } from "../types";

import {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/todoApi";

interface TodoContextType {
  todos: Todo[];
  categories: Category[];
  loading: boolean;

  page: number;
  total: number;

  setPage: (p: number) => void;
  handleSearch: (v: string) => void;

  addTodo: (data: Partial<Todo>) => Promise<void>;
  editTodo: (id: number, data: Partial<Todo>) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;

  addCategory: (data: Partial<Category>) => Promise<void>;
  editCategory: (id: number, data: Partial<Category>) => Promise<void>;
  removeCategory: (id: number) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | null>(null);

export const useTodoContext = () => {
  const ctx = useContext(TodoContext);
  if (!ctx) throw new Error("TodoContext missing Provider!");
  return ctx;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // FETCH TODOS
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await getTodo(page, search);

      const normalized = res.data.map((todo) => ({
        ...todo,
        completed:
          todo.completed === true ||
          todo.completed === 1 ||
          todo.completed === "1" ||
          todo.completed === "true",
        due_date: todo.due_date
          ? new Date(todo.due_date).toISOString().slice(0, 10)
          : "",
      }));

      setTodos(normalized);
      setTotal(res.pagination.total);
    } catch (err) {
      console.error("Failed to fetch todos", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, [page, search]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addTodo = async (data: Partial<Todo>) => {
    await createTodo(data);
    await fetchTodos();
  };

  const editTodo = async (id: number, data: Partial<Todo>) => {
    await updateTodo(id, data);
    await fetchTodos();
  };

  const removeTodo = async (id: number) => {
    await deleteTodo(id);
    await fetchTodos();
  };

  const addCategory = async (data: Partial<Category>) => {
    await createCategory(data);
    await fetchCategories();
  };

  const editCategory = async (id: number, data: Partial<Category>) => {
    await updateCategory(id, data);
    await fetchCategories();
  };

  const removeCategory = async (id: number) => {
    await deleteCategory(id);
    await fetchCategories();
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        categories,
        loading,
        total,
        page,
        setPage,
        handleSearch,

        addTodo,
        editTodo,
        removeTodo,

        addCategory,
        editCategory,
        removeCategory
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
