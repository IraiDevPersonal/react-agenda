import React from "react";

type Props = {
  children: React.ReactNode;
};

function RootLayout({ children }: Props) {
  React.useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.classList.add("dark", "min-h-svh", "w-full", "bg-background", "text-foreground", "flex");
    }
  }, []);
  return children;
}

export default RootLayout;
