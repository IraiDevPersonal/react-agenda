import type { ComponentProps, ReactNode } from "react";

import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/lib/utils";

import { FieldWrapperWithAccessory } from "./field-wrapper-with-accessory";
import { Input } from "./input";

export type SearchProps = {
  onSearch: (v: string) => void;
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
  deboundeDelay = 600,
  searchIconSize = 20,
  classNames,
  label,
  onKeyDown,
  onSearch,
  onChange,
  ...props
}: SearchProps) {
  const debounced = useDebouncedCallback((v: string) => {
    onSearch(v);
  }, deboundeDelay);

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
          debounced(e.target.value);
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);

          if (e.code === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            onSearch(e.currentTarget.value);
          }
        }}
        {...props}
      />
    </FieldWrapperWithAccessory>
  );
}

export { Search };
