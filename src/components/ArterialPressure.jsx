import React, { useState, useEffect } from "react";
import { Input } from "antd";

// Componente controlado para capturar la presión arterial (sistólica/diastólica)
const ArterialPressure = ({ value = "", onChange, label, width }) => {
  const [systolic, setSystolic] = useState(value.split("/")[0] || "");
  const [diastolic, setDiastolic] = useState(value.split("/")[1] || "");

  // Actualiza los estados internos si cambia la prop `value`
  useEffect(() => {
    if (value) {
      const [sys, dia] = value.split("/");
      setSystolic(sys || "");
      setDiastolic(dia || "");
    }
  }, [value]);

  // Notifica cambios al padre cuando cambia sistólica o diastólica
  useEffect(() => {
    const newValue = `${systolic}/${diastolic}`;
    if (value !== newValue) {
      onChange?.(newValue);
    }
  }, [systolic, diastolic]);

  return (
    <div style={{ width }}>
      <label style={{ display: "block", marginBottom: 5 }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Input
          value={systolic}
          onChange={(e) => setSystolic(e.target.value)}
          type="number"
          style={{ flex: 1 }}
          name="sistolica"
        />
        <span>/</span>
        <Input
          value={diastolic}
          onChange={(e) => setDiastolic(e.target.value)}
          type="number"
          name="diastolica"
          style={{ flex: 1 }}
        />
      </div>
    </div>
  );
};

export default ArterialPressure;
