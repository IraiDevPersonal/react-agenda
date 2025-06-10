import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props<T> = {
  fallback?: ((className: string) => ReactNode) | ReactNode;
  children: (item: T, idx: number) => ReactNode;
  items?: T[];
};

const DefaultItems: [] = [];
const DefaultClassName: string = "italic text-center text-muted-foreground";

function For<T>({ children, items = DefaultItems, fallback }: Props<T>) {
  if (items.length === 0) {
    return (
      <>
        {!fallback
          ? (
              <span className={cn(DefaultClassName)}>
                No hay items...
              </span>
            )
          : typeof fallback === "function" ? fallback(DefaultClassName) : fallback}
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
