import type { ReactNode } from "react";

import { useLayoutEffect } from "react";

import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  useLayoutEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      const styles = cn("dark min-h-svh w-full text-foreground flex bg-sidebar antialiased").split(" ");
      root.classList.add(...styles);
    }
  }, []);

  return children;
}

export default Layout;
