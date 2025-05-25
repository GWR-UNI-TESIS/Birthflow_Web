import React, { useState, useEffect } from "react";
import { Input } from "antd";

const ArterialPressure = ({ value = "", onChange, label, width }) => {
  const [systolic, setSystolic] = useState(value.split("/")[0] || "");
  const [diastolic, setDiastolic] = useState(value.split("/")[1] || "");


  useEffect(() => {
    if (value) {
      const [sys, dia] = value.split("/");
      setSystolic(sys || "");
      setDiastolic(dia || "");
    }
  }, [value]); // Se actualiza si `value` cambia


 useEffect(() => {
    const newValue = `${systolic}/${diastolic}`;
    if (value !== newValue) {
      onChange?.(newValue);
    }
  }, [systolic, diastolic]); // Solo ejecuta onChange si realmente hay cambios

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
