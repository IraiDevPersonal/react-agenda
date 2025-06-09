import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type GridProps = PropsWithChildren<{ className?: string }>;

function AppointmentGrid({ children, className }: GridProps) {
  return (
    <div className={cn("", className)}>{children}</div>
  );
}

type RowProps = PropsWithChildren<{ asHeader?: boolean; className?: string }>;

function Row({ children, asHeader, className }: RowProps) {
  return (
    <div className={cn(
      "grid grid-cols-[70px_1fr_1fr_1fr_1fr_1fr_1fr] border-b last:border-b-0",
      asHeader && "font-semibold text-center sticky top-0 bg-background z-20",
      className,
    )}
    >
      {children}
    </div>
  );
}

type ColProps = PropsWithChildren<{ className?: string }>;

function Col({ children, className }: ColProps) {
  return (
    <div className={cn("p-2 first:pe-2 pe-0 first:border-r first:bg-sidebar w-full", className)}>
      {children}
    </div>
  );
}

type CustomRowProps = Omit<RowProps, "asHeader">;

AppointmentGrid.Header = (props: CustomRowProps) => <Row asHeader {...props} />;
AppointmentGrid.Row = (props: CustomRowProps) => <Row {...props} />;
AppointmentGrid.Col = Col;

export default AppointmentGrid;
