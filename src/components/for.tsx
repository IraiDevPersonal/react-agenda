import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const DEFAULT_ITEMS: any[] = [];
const DEFAULT_CLASSNAME: string = "italic text-center text-muted-foreground";

type Props<T> = {
  fallback?: ((className: string) => ReactNode) | ReactNode;
  children: (item: T, idx: number) => ReactNode;
  items?: T[];
};

function For<T>({ children, items = DEFAULT_ITEMS, fallback }: Props<T>) {
  if (items.length === 0) {
    return (
      <>
        {!fallback
          ? (
              <span className={cn(DEFAULT_CLASSNAME)}>
                No hay items
              </span>
            )
          : typeof fallback === "function" ? fallback(DEFAULT_CLASSNAME) : fallback}
      </>
    );
  }

  return (
    <>
      {items.map(children)}
    </>
  );
}

export { For };
