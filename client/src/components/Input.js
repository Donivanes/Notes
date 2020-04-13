import React from "react";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";

const InputText = styled.input`
  font-size: 1.3em;
  width: 100%;
  &.error {
    border-color: red;
  }
`;

const ErrorMessage = styled.div`
  padding: 5px;
  background: tomato;
  color: white;
  margin: 5px;
`;

const hasError = (errors, name) => {
  if (name in errors) return "error";
  return "";
};

export const Input = React.forwardRef(
  ({ label, name, type = "text", defaultValue, placeholder }, ref) => {
    const { errors } = useFormContext();
    return (
      <div>
        <div>
          <label>{label}</label>
          {errors[name]?.message && (
            <ErrorMessage>{errors[name].message}</ErrorMessage>
          )}
        </div>
        <InputText
          type={type}
          className={hasError(errors, name)}
          name={name}
          defaultValue={defaultValue}
          ref={ref}
          placeholder={placeholder}
        />
      </div>
    );
  }
);
