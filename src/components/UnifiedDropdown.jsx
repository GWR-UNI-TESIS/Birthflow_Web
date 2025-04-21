import React, { useState, useEffect } from "react";
import { Select } from "antd";

const UnifiedDropdown = ({ 
  locationOptions, 
  intensityOptions, 
  value = "", 
  onChange 
}) => {
  // Extraer valores iniciales (ejemplo: "sacro - fuerte")
  const [selectedLocation, setSelectedLocation] = useState(
    value.split(" - ")[0] || locationOptions[0]?.value
  );
  const [selectedIntensity, setSelectedIntensity] = useState(
    value.split(" - ")[1] || intensityOptions[0]?.value
  );

  useEffect(() => {
    const newValue = `${selectedLocation} - ${selectedIntensity}`;
    if (value !== newValue) {
      onChange?.(newValue);
    }
  }, [selectedLocation, selectedIntensity]); // Solo ejecuta onChange si hay cambios

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Select 
        value={selectedLocation} 
        onChange={setSelectedLocation} 
        placeholder="Seleccione Localización" 
        style={{ flex: 1 }}
      >
        {locationOptions.map((opt) => (
          <Select.Option key={opt.value} value={opt.value}>
            {opt.label}
          </Select.Option>
        ))}
      </Select>

      <Select 
        value={selectedIntensity} 
        onChange={setSelectedIntensity} 
        placeholder="Seleccione Intensidad" 
        style={{ flex: 1 }}
      >
        {intensityOptions.map((opt) => (
          <Select.Option key={opt.value} value={opt.value}>
            {opt.label}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default UnifiedDropdown;
