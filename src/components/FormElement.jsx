import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";

const OPTION_TYPES = [
    { value: "'", label: "minuto" },
    { value: "''", label: "segundo" },
];

const FormElement = ({ label, width, initialValue = "", onChange }) => {
    // Extraemos la parte numérica y la unidad (minuto/segundo)
    const [textValue, setTextValue] = useState(initialValue.split("x")[0] || "");
    const [selectedOption, setSelectedOption] = useState(
        initialValue.split("x")[1] || "'"
    );

    useEffect(() => {
        onChange?.(`${textValue}x${selectedOption}`);
    }, [textValue, selectedOption, onChange]);

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
