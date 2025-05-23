import React, { useState, useEffect } from "react";
import { Select } from "antd";

const UnifiedDropdown = ({
  locationOptions,
  intensityOptions,
  value = "",
  onChange
}) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIntensity, setSelectedIntensity] = useState("");

  useEffect(() => {
    const [location, intensity] = value.split(" - ");
    setSelectedLocation(location || locationOptions[0]?.value);
    setSelectedIntensity(intensity || intensityOptions[0]?.value);
  }, [value]);

  useEffect(() => {
    const newValue = `${selectedLocation} - ${selectedIntensity}`;
    onChange?.(newValue);
  }, [selectedLocation, selectedIntensity]);

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
