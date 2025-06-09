import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type GridProps = PropsWithChildren<{ className?: string }>;

function AppointmentGrid({ children, className }: GridProps) {
  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>{children}</div>
  );
}

type RowProps = PropsWithChildren<{ asHeader?: boolean; className?: string }>;

function Row({ children, asHeader, className }: RowProps) {
  return (
    <div className={cn(
      "grid grid-cols-[70px_1fr_1fr_1fr_1fr_1fr_1fr] border-b last:border-b-0",
      asHeader && "font-semibold text-center bg-sidebar sticky top-0 z-20",
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
    <div className={cn("p-2 border-r last:border-0 first:bg-sidebar w-full", className)}>
      {children}
    </div>
  );
}

function TimeCol({ from, to }: { to: string; from: string }) {
  return (
    <AppointmentGrid.Col className="text-right text-sm text-muted-foreground flex flex-col gap-y-4 justify-between">
      <span>{from}</span>
      <span>{to}</span>
    </AppointmentGrid.Col>
  );
}

type CustomRowProps = Omit<RowProps, "asHeader">;

AppointmentGrid.Header = (props: CustomRowProps) => <Row asHeader {...props} />;
AppointmentGrid.Row = (props: CustomRowProps) => <Row {...props} />;
AppointmentGrid.TimeCol = TimeCol;
AppointmentGrid.Col = Col;

export default AppointmentGrid;
