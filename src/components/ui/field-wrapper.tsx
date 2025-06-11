import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  className?: string;
}>;

function FieldWrapper({ children, className }: Props) {
  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      {children}
    </div>
  );
}

export { FieldWrapper };
