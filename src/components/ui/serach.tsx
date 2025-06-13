import type { PropsWithChildren } from "react";

import { SearchIcon } from "lucide-react";

import { FieldWrapperWithAccessory } from "./field-wrapper-with-accessory";
import { Input } from "./input";

type Props = PropsWithChildren<{
  queryKey?: string;
}>;

function Serach(props: Props) {
  return (
    <FieldWrapperWithAccessory
      label="Rut Paciente"
      endComponent={<SearchIcon size={20} />}
    >
      <Input className="w-52 pe-8" placeholder="Buscar..." />
    </FieldWrapperWithAccessory>
  );
}

export { Serach };
