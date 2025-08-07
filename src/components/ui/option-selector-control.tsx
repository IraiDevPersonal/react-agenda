import { XIcon } from "lucide-react";

import type { Option } from "@/lib/types/global-types";

import { cn } from "@/lib/utils";

import { For } from "../for";
import { Badge } from "./badge";
import { FieldWrapper } from "./field-wrapper";
import { SelectNative } from "./select-native";

type Props = {
  onAdd: React.ChangeEventHandler<HTMLSelectElement>;
  onRemove: (id: number) => void;
  items: { id: number; name: string }[];
  emptyPlaceholder: string;
  options: Option[];
  label: string;
};

function OptionSelectorControl({
  emptyPlaceholder,
  options,
  items,
  label,
  onRemove,
  onAdd,
}: Props) {
  return (
    <div className="col-span-2 w-full flex flex-col gap-2">
      <FieldWrapper label={label}>
        <SelectNative
          options={options}
          onChange={onAdd}
        />
      </FieldWrapper>

      <ul className="flex gap-1 flex-wrap">
        <For
          items={items}
          fallback={cls => <span className={cn(cls, "text-xs ms-3")}>{emptyPlaceholder}</span>}
        >
          {profession => (
            <li key={profession.id}>
              <Badge variant="outline" className="text-sm py-1 px-3">
                {profession.name}
                <button
                  type="button"
                  onClick={() => onRemove(profession.id)}
                  className="focus-visible:border-ring focus-visible:ring-ring/50 text-primary hover:text-primary/60 -my-px -ms-px -me-1.5 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 transition-colors outline-none focus-visible:ring-[3px]"
                >
                  <XIcon size={12} aria-hidden="true" />
                </button>
              </Badge>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}

export { OptionSelectorControl };
