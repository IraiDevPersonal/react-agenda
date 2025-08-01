import type { SearchProps } from "@/components/ui/search";

import { Search } from "@/components/ui/search";
import { useState } from "react";
import { prettifyRut } from "react-rut-formatter";

type Props = SearchProps;

function SearchPatient({ defaultValue, onSearch, ...props}: Props) {
  const [rut, setRut] = useState<string>(defaultValue?.toString() ?? "")

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRut(value.length <= 3 ? value : prettifyRut(value));
  };

  return (
    <>
      <Search
        value={rut}
        placeholder="Buscar por rut..."
        onChange={handleRutChange}
        onSearch={() => onSearch(rut)}
        {...props}
      />
    </>
  );
}

export { SearchPatient };
