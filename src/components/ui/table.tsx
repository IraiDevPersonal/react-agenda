import * as React from "react";

import { CustomError } from "@/lib/custom-error";
import { cn } from "@/lib/utils";

type TableProps = React.ComponentProps<"table"> & {
  hovereable?: boolean;
};

const Context = React.createContext<Pick<TableProps, "hovereable">>({
  hovereable: false,
});

function useTableContext() {
  const context = React.use(Context);
  if (!context) {
    throw new CustomError("el useTableContext solo puede ser usado dentro de su provider");
  }
  return context;
}

function Table({ className, hovereable, ...props }: TableProps) {
  const value = React.useMemo(() => ({ hovereable }), [hovereable]);
  return (
    <Context value={value}>
      <div className="relative w-full overflow-auto">
        <table
          data-slot="table"
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </div>
    </Context>
  );
}

function TableContainer({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("w-max mx-auto border rounded-lg overflow-hidden", className)}>
      {children}
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn(className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  const { hovereable } = useTableContext();
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "data-[state=selected]:bg-muted border-b transition-colors",
        hovereable && "hover:bg-muted/50",
        className,
      )}
      {...props}
    />
  );
}

function TableHeaderRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-header-row"
      className={cn("bg-muted border-b", className)}
      {...props}
    />
  );
}

function TableHeaderFilterRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-header-row-filter"
      className={cn("bg-transparent border-b *:p-0 *:h-full *:border-r *:last-of-type:border-r-0", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-muted-foreground h-10 px-3 align-middle font-medium has-[role=checkbox]:w-px [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "py-2 px-3 align-middle [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Row = TableRow;
Table.HeaderRow = TableHeaderRow;
Table.HeaderFilterRow = TableHeaderFilterRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Caption = TableCaption;
Table.Container = TableContainer;

export {
  Table,
};
