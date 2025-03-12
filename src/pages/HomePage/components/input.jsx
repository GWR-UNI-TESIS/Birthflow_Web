import "react";
import { Select, Input, Form, Space } from "antd";

const { Option } = Select;

// eslint-disable-next-line react/prop-types
const TimeInputSelector = ({ name, placeholder, options, errorMessage }) => (
  <Space.Compact>
    <Input style={{ margin: "10px" }} placeholder=" " />
    <span
      style={{
        fontSize: "1.1em",
        fontWeight: "bold",
        color: "black",
        padding: "8px",
        marginRight: "2px",
        marginTop: "8px",
      }}
    >
      X
    </span>

    <Form.Item
      name={name}
      noStyle
      rules={[{ required: true, message: errorMessage || "Campo requerido" }]}
    >
      <Select
        placeholder={placeholder}
        style={{ width: "50%", margin: "10px" }}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  </Space.Compact>
);
export default TimeInputSelector;
