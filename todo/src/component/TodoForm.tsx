import { Modal, Form, Input, Select, DatePicker, Switch } from "antd";
import type { Todo, Category, Priority } from "../types";
import { useEffect } from "react";
import dayjs from "dayjs";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Todo>) => void;
  categories: Category[];
  initialData?: Todo | null;
}

const priorities: Priority[] = ["high", "medium", "low"];

const TodoForm = ({ open, onClose, onSubmit, categories, initialData }: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        due_date: initialData.due_date ? dayjs(initialData.due_date) : null,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  return (
    <Modal
      open={open}
      title={initialData ? "Edit Todo" : "Create Todo"}
      okText="Save"
      onCancel={onClose}
      onOk={() => {
        form.validateFields().then(values => {
          onSubmit({
            ...values,
            due_date: values.due_date ? values.due_date.toISOString() : null,
          });
          form.resetFields();
        });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="categoryId" label="Category">
          <Select allowClear>
            {categories.map(c => (
              <Select.Option key={c.id} value={c.id}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="priority" label="Priority">
          <Select>
            {priorities.map(p => (
              <Select.Option key={p} value={p}>
                {p}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="due_date" label="Due Date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="completed" label="Completed" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoForm;
