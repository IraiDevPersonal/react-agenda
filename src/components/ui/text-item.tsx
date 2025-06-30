import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string
}>;

function TextItem({ children, className }: Props) {
  return (
    <dl className={cn("grid grid-cols-[max-content,1fr] gap-x-2 w-full", className)}>
      {children}
    </dl>
  );
}

function Label({ children }: Props) {
  return (
    <dt className="font-semibold capitalize">{children}</dt>
  );
}

type ValueProps = PropsWithChildren<{
  className?: string
  capitalize?: boolean
}>

function Value({ children, className, capitalize }: ValueProps) {
  return (
    <dd className={cn("opacity-70", className, capitalize && "capitalize")}>{children}</dd>
  );
}

TextItem.Label = Label;
TextItem.Value = Value;

export { TextItem };
