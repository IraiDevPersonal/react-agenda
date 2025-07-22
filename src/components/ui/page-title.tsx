import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  className?: string;
}>;

function PageTitle({ children, className }: Props) {
  return (
    <h1 className={cn("text-4xl font-bold mb-4", className)}>{children}</h1>
  );
}

export { PageTitle };
