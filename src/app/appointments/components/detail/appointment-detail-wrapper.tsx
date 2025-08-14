import type { PropsWithChildren } from "react";

type Props = PropsWithChildren;

function AppointmentDetailWrapper(props: Props) {
  return (
    <aside className="w-lg space-y-4 flex flex-col h-full">
      {props.children}
    </aside>
  );
}

export { AppointmentDetailWrapper };
