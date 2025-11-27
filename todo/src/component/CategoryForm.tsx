import { Modal, Form, Input } from "antd";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const CategoryForm = ({ open, onClose, onSubmit, initialData }: Props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      title={initialData ? "Edit Category" : "Add Category"}
    >
      <Form
        form={form}
        initialValues={initialData}
        onFinish={onSubmit}
        layout="vertical"
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Color" name="color" rules={[{ required: true }]}>
          <Input type="color" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;
