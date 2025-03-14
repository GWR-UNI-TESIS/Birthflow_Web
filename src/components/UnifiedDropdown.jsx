import React, { useState, useEffect } from "react";
import { Select } from "antd";

const UnifiedDropdown = ({ 
  locationOptions, 
  intensityOptions, 
  initialValue = "", 
  onChange 
}) => {
  // Extraer valores iniciales (ejemplo: "sacro - fuerte")
  const [selectedLocation, setSelectedLocation] = useState(
    initialValue.split(" - ")[0] || locationOptions[0]?.value
  );
  const [selectedIntensity, setSelectedIntensity] = useState(
    initialValue.split(" - ")[1] || intensityOptions[0]?.value
  );

  useEffect(() => {
    onChange?.(`${selectedLocation} - ${selectedIntensity}`);
  }, [selectedLocation, selectedIntensity, onChange]);

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
