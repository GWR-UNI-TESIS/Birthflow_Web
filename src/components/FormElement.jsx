import React, { useState, useEffect } from "react";
import { Input, Select } from "antd";

// Opciones de unidad (minutos o segundos)
const OPTION_TYPES = [
  { value: "'", label: "minuto" },
  { value: "''", label: "segundo" },
];

// Componente genérico para capturar un valor numérico con unidad seleccionable
const FormElement = ({ value = "", onChange, label, width }) => {
  // Separa valor numérico y unidad a partir de la prop `value`
  const [textValue, setTextValue] = useState(value.split("x")[0] || "");
  const [selectedOption, setSelectedOption] = useState(value.split("x")[1] || "'");

  // Actualiza estados internos si cambia el prop `value`
  useEffect(() => {
    if (value) {
      const [num, unit] = value.split("x");
      setTextValue(num || "");
      setSelectedOption(unit || "'");
    }
  }, [value]);

  // Notifica cambios al padre cuando cambia el valor o la unidad
  useEffect(() => {
    const newValue = `${textValue}x${selectedOption}`;
    if (value !== newValue) {
      onChange?.(newValue);
    }
  }, [textValue, selectedOption]);

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
          name="valor"
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
