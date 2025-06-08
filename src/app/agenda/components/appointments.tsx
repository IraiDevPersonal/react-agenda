import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

function Appointments() {
  return (
    <div>
      {/* header */}
      <Grid asHeader>
        <Col className="text-right">Horario</Col>
        <Col>Lunes</Col>
        <Col>Martes</Col>
        <Col>Miercoles</Col>
        <Col>Jueves</Col>
        <Col>Viernes</Col>
        <Col>Sabado</Col>
        <Col>Domingo</Col>
      </Grid>
      {/* body */}
      {
        Array.from({ length: 10 }).map((_, idx) => (
          <Grid key={idx}>
            <Col className="text-right text-muted-foreground">09:30</Col>
            <Col>enabled</Col>
            <Col>enabled</Col>
            <Col>enabled</Col>
            <Col>enabled</Col>
            <Col>enabled</Col>
            <Col>enabled</Col>
            <Col>enabled</Col>
          </Grid>
        ))
      }
    </div>
  );
}

function Grid({ children, asHeader, className }: PropsWithChildren<{ asHeader?: boolean; className?: string }>) {
  return (
    <div className={cn("grid grid-cols-[70px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-t first:border-t-0", asHeader && "font-semibold text-center", className)}>
      {children}
    </div>
  );
}

function Col({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("p-2 border-r last:border-r-0", className)}>
      {children}
    </div>
  );
}

export { Appointments };
