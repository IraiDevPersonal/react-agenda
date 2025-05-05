import type { ToasterProps } from "sonner";

import { Toaster as Sonner } from "sonner";

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      // theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          description: "text-muted-foreground!",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
