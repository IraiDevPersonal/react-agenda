import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import type { Option } from "@/types/global.type";

import { cn } from "@/lib/utils";

type Props = {
  withEmptyOption?: boolean;
  options?: Option[];
} & React.ComponentProps<"select">;

const DEFAULT_OPTIONS: Option[] = [];

function SelectNative({
  options = DEFAULT_OPTIONS,
  withEmptyOption = true,
  className,
  ...props
}: Props) {
  return (
    <div className="relative flex">
      <select
        data-slot="select-native"
        className={cn(
          "peer border-input text-foreground focus-visible:border-ring focus-visible:ring-ring/50 has-[option[disabled]:checked]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-full cursor-pointer appearance-none items-center rounded-md border text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          props.multiple
            ? "[&_option:checked]:bg-accent py-1 *:px-3 *:py-1"
            : "h-9 ps-3 pe-8",
          className,
        )}
        {...props}
      >
        {withEmptyOption && <option value="">Sin selección...</option>}
        {options.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {!props.multiple && (
        <span className="text-muted-foreground/80 peer-aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center peer-disabled:opacity-50">
          <ChevronDownIcon size={16} aria-hidden="true" />
        </span>
      )}
    </div>
  );
}

export { SelectNative };
