import { XIcon } from "lucide-react";

import { For } from "@/components/for";
import { Badge } from "@/components/ui/badge";
import { FieldWrapper } from "@/components/ui/field-wrapper";
import { SelectNative } from "@/components/ui/select-native";
import { cn } from "@/lib/utils";

import { useProfessionalProfessionsControl } from "../hooks/use-professional-professions-control";

function ProfessionalProfessionsControl() {
  const {
    options,
    professions,
    handleAddProfession,
    handleRemoveProfession,
  } = useProfessionalProfessionsControl();

  return (
    <div className="col-span-2 w-full flex flex-col gap-2">
      <FieldWrapper label="Profesiones">
        <SelectNative
          options={options}
          onChange={handleAddProfession}
        />
      </FieldWrapper>

      <ul className="flex gap-1 flex-wrap">
        <For
          items={professions}
          fallback={cls => <span className={cn(cls, "text-xs ms-3")}>Sin profesiones...</span>}
        >
          {profession => (
            <li key={profession.id}>
              <Badge variant="outline" className="text-sm py-1 px-3">
                {profession.name}
                <button
                  type="button"
                  onClick={() => handleRemoveProfession(profession.id)}
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

export { ProfessionalProfessionsControl };
