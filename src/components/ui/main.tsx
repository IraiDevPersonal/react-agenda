import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  className?: string;
}>;

function Main({ children, className }: Props) {
  return (
    <main
      className={cn("space-y-4 h-full overflow-y-auto flex w-full", className)}
    >
      {children}
    </main>
  );
}

export { Main };
