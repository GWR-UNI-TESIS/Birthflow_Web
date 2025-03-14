import React, { useState, useEffect } from "react";
import { Input } from "antd";

const ArterialPressure = ({ label, width, initialValue = "", onChange }) => {
  // Extraer los valores iniciales (ejemplo: "120/80")
  const [systolic, setSystolic] = useState(initialValue.split("/")[0] || "");
  const [diastolic, setDiastolic] = useState(initialValue.split("/")[1] || "");

  useEffect(() => {
    onChange?.(`${systolic}/${diastolic}`);
  }, [systolic, diastolic, onChange]);

  return (
    <div style={{ width }}>
      <label style={{ display: "block", marginBottom: 5 }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Input
          value={systolic}
          onChange={(e) => setSystolic(e.target.value)}
          placeholder="Sistólica"
          type="number"
          style={{ flex: 1 }}
        />
        <span>/</span>
        <Input
          value={diastolic}
          onChange={(e) => setDiastolic(e.target.value)}
          placeholder="Diastólica"
          type="number"
          style={{ flex: 1 }}
        />
      </div>
    </div>
  );
};

export default ArterialPressure;
