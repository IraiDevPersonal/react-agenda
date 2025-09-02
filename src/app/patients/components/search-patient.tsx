import { useState } from "react";
import { checkRut, prettifyRut } from "react-rut-formatter";

import type { SearchProps } from "@/components/ui/search";

import { Search } from "@/components/ui/search";
import { notification } from "@/lib/notification";

type Props = SearchProps;

function SearchPatient({ defaultValue, onSearch, ...props }: Props) {
  const [value, setValue] = useState<string>(defaultValue?.toString() ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value.length <= 3 ? value : prettifyRut(value));
  };

  return (
    <Search
      onSearch={() => {
        if (value.length > 0 && !checkRut(value)) {
          notification.warning("El rut ingresado es invalido");
          return;
        }

        onSearch(value);
      }}
      placeholder="Buscar por rut..."
      onChange={handleChange}
      value={value}
      {...props}
    />
  );
}

export { SearchPatient };
