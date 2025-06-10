import type { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  fallback?: ReactNode;
  when: boolean;
}>;

function Show({ when, children, fallback }: Props) {
  return (
    <>
      {fallback}
      {when ? children : null}
    </>
  );
}

export { Show };
