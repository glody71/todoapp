export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  categoryId: number;
  category?: Category;
  priority: 'high' | 'medium' | 'low'; 
  due_date?: string; 
}

export type Priority = "high" | "medium" | "low";