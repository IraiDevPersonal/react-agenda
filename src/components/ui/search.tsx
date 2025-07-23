import type { ComponentProps, PropsWithChildren, ReactNode } from "react";

import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/lib/utils";

import { FieldWrapperWithAccessory } from "./field-wrapper-with-accessory";
import { Input } from "./input";

type Props = PropsWithChildren<{
  onClearValue?: () => void;
  onSearch?: (v: string) => void;
  deboundeDelay?: number;
  label?: ReactNode;
  classNames?: Partial<{
    input: string;
    root: string;
    label: string;
  }>;
}> & ComponentProps<"input">;

function Search({
  deboundeDelay = 1000,
  classNames,
  label,
  value,
  onClearValue,
  onKeyDown,
  onSearch,
  onChange,
  ...props
}: Props) {
  const [isSubmited, setIsSubmited] = useState(false);
  const debounced = useDebouncedCallback(
    (value) => {
      if (!isSubmited) {
        onSearch?.(value);
      }
    },
    deboundeDelay,
  );

  return (
    <FieldWrapperWithAccessory
      label={label}
      classNames={classNames}
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
          <button
            type="button"
            className="cursor-pointer hover:text-primary transition-colors"
            onClick={() => {
              if (value) {
                setIsSubmited(true);
                onSearch?.(value.toString());
              }
            }}
          >
            <SearchIcon size={20} />
          </button>
        </>
      )}
    >
      <Input
        className={cn("w-48 pe-14", classNames?.input)}
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
