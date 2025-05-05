import type { ReactNode } from "react";

import { useLayoutEffect } from "react";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  useLayoutEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.classList.add("dark", "min-h-svh", "w-full", "bg-background", "text-foreground", "flex");
    }
  }, []);

  return children;
}

export default Layout;
