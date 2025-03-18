import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";

const OPTION_TYPES = [
    { value: "'", label: "minuto" },
    { value: "''", label: "segundo" },
];

const FormElement = ({ value = "", onChange, label, width }) => {
    // Extraemos la parte numérica y la unidad (minuto/segundo)
    const [textValue, setTextValue] = useState(value.split("x")[0] || "");
    const [selectedOption, setSelectedOption] = useState(value.split("x")[1] || "'");

    useEffect(() => {
        if (value) {
          const [num, unit] = value.split("x");
          setTextValue(num || "");
          setSelectedOption(unit || "'");
        }
      }, [value]); 

  useEffect(() => {
    const newValue = `${textValue}x${selectedOption}`;
    if (value !== newValue) {
      onChange?.(newValue);
    }
  }, [textValue, selectedOption]); // Solo ejecuta onChange si hay cambios

    return (
        <div style={{ width }}>
            <label style={{ display: "block", marginBottom: 5 }}>{label}</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Input
                    type="number"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    placeholder="Ingrese valor"
                    style={{ flex: 1 }}
                />
                <span>X</span>
                <Select
                    value={selectedOption}
                    onChange={setSelectedOption}
                    style={{ flex: 2 }}
                    options={OPTION_TYPES}
                />
            </div>
        </div>
    );
};

export default FormElement;
