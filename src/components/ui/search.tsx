import type { ComponentProps, PropsWithChildren } from "react";

import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { FieldWrapperWithAccessory } from "./field-wrapper-with-accessory";
import { Input } from "./input";

type Props = PropsWithChildren<{
  onClearValue?: () => void;
  onSearch?: (v: string) => void;
  deboundeDelay?: number;
  label?: string;
}> & ComponentProps<"input">;

function Search({ label, deboundeDelay = 1000, value, onSearch, onClearValue, onChange, onKeyDown, ...props }: Props) {
  const [isSubmited, setIsSubmited] = useState(false);
  const debounced = useDebouncedCallback(
    (value) => {
      if (isSubmited)
        return;
      onSearch?.(value);
    },
    deboundeDelay,
  );

  return (
    <FieldWrapperWithAccessory
      label={label}
      endComponent={(
        <>
          {onClearValue && value
            && (
              <button
                type="button"
                onClick={() => onClearValue()}
                className="cursor-pointer hover:text-red-600 transition-colors"
              >
                <XIcon size={14} />
              </button>
            )}
          <SearchIcon size={20} />
        </>
      )}
    >
      <Input
        className="w-52 pe-14"
        placeholder="Buscar..."
        value={value}
        onChange={(e) => {
          setIsSubmited(false);
          onChange?.(e);
          debounced(e.target.value);
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);

          if (e.code === "Enter") {
            e.preventDefault();
            e.stopPropagation();

            setIsSubmited(true);
            onSearch?.(e.currentTarget.value);
          }
        }}
        {...props}
      />
    </FieldWrapperWithAccessory>
  );
}

export { Search };
