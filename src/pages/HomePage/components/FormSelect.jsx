import "react";
import { Select } from "antd";

const { Option } = Select;

// eslint-disable-next-line react/prop-types
const CustomSelect = (
  // eslint-disable-next-line react/prop-types
  { options = [] },
  { value },
  { onChange },
  { placeholder }
) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: "100%" }}
    >
      {options.map((opt) => (
        <Option key={opt.value} value={opt.value}>
          {opt.label}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
