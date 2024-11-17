import React from "react";
import styled from "styled-components";

// Styled Select Container
const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: Arial, sans-serif;
`;

// Label Styling
const Label = styled.label`
  font-size: 16px;
  color: #333;
`;

// Styled Select
const StyledSelect = styled.select`
  appearance: none;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f9f9f9;
  color: #333;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 3px rgba(0, 123, 255, 0.5);
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

// Custom Select Component
const CustomSelect = ({ label, options, name, value, onChange }) => {
  return (
    <SelectContainer>
      <Label htmlFor={name}>{label}</Label>
      <StyledSelect
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
      >
        <option value="">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

export default CustomSelect;
