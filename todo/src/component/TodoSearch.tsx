import { Input } from "antd";

interface Props {
  onSearch: (value: string) => void;
}

const TodoSearch = ({ onSearch }: Props) => {
  return (
    <div style={{ maxWidth: 300 }}>
      <Input.Search
        placeholder="Search todos..."
        allowClear
        enterButton
        onSearch={(value) => onSearch(value)}      // penting
        onChange={(e) => onSearch(e.target.value)} // optional: live search
      />
    </div>
  );
};

export default TodoSearch;
