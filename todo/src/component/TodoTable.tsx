import { Table, Tag, Button } from "antd";
import type { Todo } from "../types";

interface Props {
  todos: Todo[];
  loading: boolean;
  onEdit: (todo: Todo) => void;
  onDelete: (id: number) => void;

  pagination: {
    current: number;
    total: number;
    pageSize: number;
    onChange: (page: number) => void;
  };
}

const TodoTable = ({ todos, loading, onEdit, onDelete, pagination }: Props) => {
  // extract unique categories
  const categoryFilters = Array.from(
    new Set(todos.map((t) => t.category?.name).filter(Boolean))
  ).map((name) => ({ text: name, value: name }));

  // unique priorities
  const priorityFilters = Array.from(new Set(todos.map((t) => t.priority))).map(
    (p) => ({ text: p, value: p })
  );

  const statusFilters = [
    { text: "Completed", value: "completed" },
    { text: "Pending", value: "pending" },
  ];

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (_: any, todo: Todo) => (
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            opacity: todo.completed ? 0.6 : 1,
          }}
        >
          {todo.title}
        </span>
      ),
      // simple text search on title
      onFilter: (value: any, record: Todo) =>
        record.title.toLowerCase().includes(String(value).toLowerCase()),
    },

    // CATEGORY FILTER
    {
      title: "Category",
      dataIndex: ["category", "name"],
      filters: categoryFilters,
      onFilter: (value: any, record: Todo) =>
        record.category?.name === value,
      render: (_: any, todo: Todo) =>
        todo.category ? (
          <Tag color={todo.category.color}>{todo.category.name}</Tag>
        ) : (
          "-"
        ),
    },

    // PRIORITY FILTER
    {
      title: "Priority",
      dataIndex: "priority",
      filters: priorityFilters,
      onFilter: (value: any, record: Todo) => record.priority === value,
    },

    // DUE DATE — simple text-based filter
    {
      title: "Due Date",
      dataIndex: "due_date",
      onFilter: (value: any, record: Todo) =>
        record.due_date.includes(value),
    },

    // STATUS FILTER
    {
      title: "Status",
      filters: statusFilters,
      onFilter: (value: any, record: Todo) =>
        value === "completed" ? record.completed : !record.completed,
      render: (_: any, todo: Todo) =>
        todo.completed ? (
          <Tag color="green">Completed</Tag>
        ) : (
          <Tag color="red">Pending</Tag>
        ),
    },

    // ACTIONS
    {
      title: "Actions",
      render: (_: any, todo: Todo) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button size="small" onClick={() => onEdit(todo)}>
            Edit
          </Button>
          <Button danger size="small" onClick={() => onDelete(todo.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      loading={loading}
      dataSource={todos}
      columns={columns}
      pagination={pagination}
    />
  );
};

export default TodoTable;
