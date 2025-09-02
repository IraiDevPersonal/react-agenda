import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type GridProps = PropsWithChildren<{ className?: string }>;

function AppointmentGrid({ children, className }: GridProps) {
  return (
    <div
      className={cn(
        "border rounded-lg overflow-hidden w-full h-max",
        className,
      )}
    >
      {children}
    </div>
  );
}

type RowProps = PropsWithChildren<{ asHeader?: boolean; className?: string }>;

function Row({ children, asHeader, className }: RowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[50px_1fr_1fr_1fr_1fr_1fr_1fr]",
        asHeader && "font-semibold text-center bg-sidebar sticky top-0 z-20",
        className,
      )}
    >
      {children}
    </div>
  );
}

type CellProps = PropsWithChildren<{ className?: string }>;

function Cell({ children, className }: CellProps) {
  return <div className={cn("p-2 w-full", className)}>{children}</div>;
}

function HeaderCell({ className, ...props }: CellProps) {
  return (
    <AppointmentGrid.Cell
      {...props}
      className={cn("border-r last:border-r-0", className)}
    />
  );
}

function TimeCell({ from, to }: { to: string; from: string }) {
  return (
    <AppointmentGrid.Cell className="bg-sidebar text-right text-sm text-muted-foreground flex flex-col gap-y-4 justify-between border-r">
      <span>{from}</span>
      <span>{to}</span>
    </AppointmentGrid.Cell>
  );
}

type CustomRowProps = Omit<RowProps, "asHeader">;

function HeaderRow({ className, ...props }: CustomRowProps) {
  return <Row asHeader {...props} className={cn("border-b", className)} />;
}

function BodyRow({ className, ...props }: CustomRowProps) {
  return <Row {...props} className={cn("border-b last:border-0", className)} />;
}

AppointmentGrid.HeaderCell = HeaderCell;
AppointmentGrid.TimeCell = TimeCell;
AppointmentGrid.Header = HeaderRow;
AppointmentGrid.Row = BodyRow;
AppointmentGrid.Cell = Cell;

export { AppointmentGrid };
