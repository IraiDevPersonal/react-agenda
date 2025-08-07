import { useState } from "react";
import { prettifyRut } from "react-rut-formatter";

import type { InputProps } from "./input";

import { Input } from "./input";

function RutInput({ disabled, defaultValue, ...props }: InputProps) {
  const [rutValue, setRutValue] = useState(defaultValue ?? "");

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRutValue(value.length <= 3 ? value : prettifyRut(value));
  };

  return (
    <Input
      onChange={handleRutChange}
      placeholder="Rut paciente"
      disabled={disabled}
      value={rutValue}
      name="rut"
      {...props}
    />
  );
}

export { RutInput };
