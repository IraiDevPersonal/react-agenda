import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

function AppointmentDetailWrapper(props: Props) {
  return (
    <aside className="pl-4 min-w-lg max-w-lg w-full space-y-4 ml-4 border-l flex flex-col">
      {props.children}
    </aside>
  );
}

export { AppointmentDetailWrapper };
