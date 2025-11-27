import { useState } from "react";
import { Button, Space } from "antd";
import TodoSearch from "../component/TodoSearch";
import TodoTable from "../component/TodoTable";
import TodoForm from "../component/TodoForm";
import { useTodoContext } from "../context/TodoContext";
import type { Todo } from "../types";
import CategoryForm from "../component/CategoryForm";

const TodoPage = () => {
  const {
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
    removeCategory,
  } = useTodoContext();

  const [openForm, setOpenForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [openCategoryForm, setOpenCategoryForm] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);

  const handleSubmit = async (data: Partial<Todo>) => {
    if (editingTodo) await editTodo(editingTodo.id, data);
    else await addTodo(data);

    setOpenForm(false);
    setEditingTodo(null);
  };

  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <TodoSearch onSearch={handleSearch} />
        <Space>
          <Button type="primary" onClick={() => setOpenForm(true)}>
            + Add Todo
          </Button>
          <Button type="primary" onClick={() => setOpenCategoryForm(true)}>
            + Add Category
          </Button>
        </Space>
      </div>

      <TodoTable
        todos={todos}
        loading={loading}
        onEdit={(todo) => {
          setEditingTodo(todo);
          setOpenForm(true);
        }}
        onDelete={(id) => removeTodo(id)}
        pagination={{
          current: page,
          pageSize: 10,
          total,
          onChange: (p) => setPage(p),
        }}
      />

      <TodoForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingTodo(null);
        }}
        onSubmit={handleSubmit}
        categories={categories}
        initialData={editingTodo}
      />

      <CategoryForm
        open={openCategoryForm}
        onClose={() => {
          setOpenCategoryForm(false);
          setEditingCat(null);
        }}
        onSubmit={async (data) => {
          if (editingCat) {
            await editCategory(editingCat.id, data);
          } else {
            await addCategory(data);
          }
          setOpenCategoryForm(false);
          setEditingCat(null);
        }}
        initialData={editingCat}
      />
      
    </div>
  );
};

export default TodoPage;
