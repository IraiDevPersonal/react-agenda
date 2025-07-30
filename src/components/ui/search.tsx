import type { ComponentProps, ReactNode } from "react";

import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { FieldWrapperWithAccessory } from "./field-wrapper-with-accessory";
import { Input } from "./input";

type Props = {
  onSearch?: (v: string) => void;
  searchIconSize?: number;
  deboundeDelay?: number;
  label?: ReactNode;
  classNames?: Partial<{
    input: string;
    root: string;
    label: string;
  }>;
} & ComponentProps<"input">;

function Search({
  searchIconSize = 20,
  classNames,
  label,
  onKeyDown,
  onSearch,
  onChange,
  ...props
}: Props) {
  const handleSearch = (v: string) => {
    onSearch?.(v);
  };

  return (
    <FieldWrapperWithAccessory
      label={label}
      classNames={classNames}
      endComponent={(
        <SearchIcon size={searchIconSize} />
      )}
    >
      <Input
        className={cn("w-48 pe-14", classNames?.input)}
        placeholder="Buscar..."
        onChange={(e) => {
          onChange?.(e);
          handleSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);

          if (e.code === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            handleSearch(e.currentTarget.value);
          }
        }}
        {...props}
      />
    </FieldWrapperWithAccessory>
  );
}

export { Search };
