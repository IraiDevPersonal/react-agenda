import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  className?: string;
  title: string;
}>;

function PageLayout({ title, children, className = "p-4" }: Props) {
  return (
    <>
      <title>{title}</title>
      <div className={cn("flex flex-col space-y-4 overflow-hidden w-full", className)}>
        {children}
      </div>
    </>
  );
};

export default PageLayout;
