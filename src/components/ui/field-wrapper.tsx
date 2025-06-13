import type { PropsWithChildren } from "react";

import { useId } from "react";

import { cn } from "@/lib/utils";

import { Label } from "./label";

type Props = PropsWithChildren<{
  labelId?: string;
  classNames?: Partial<{
    root: string;
    label: string;
  }>;
  label?: string;
}>;

function FieldWrapper({ children, labelId, label, classNames }: Props) {
  return (
    <div className={cn("flex flex-col space-y-1", classNames?.root)}>
      {label && <Label htmlFor={labelId} className={classNames?.label}>{label}</Label>}
      {children}
    </div>
  );
}

export { FieldWrapper };
