import type { PropsWithChildren, ReactNode } from "react";

import { FieldWrapper } from "./field-wrapper";

type Props = PropsWithChildren<{
  startComponent?: ReactNode;
  endComponent?: ReactNode;
  classNames?: Partial<{
    root: string;
    label: string;
  }>;
  label?: string;
}>;

function FieldWrapperWithAccessory({ children, label, classNames, endComponent, startComponent }: Props) {
  return (
    <FieldWrapper classNames={classNames} label={label}>
      <div className="relative">
        {startComponent && (
          <div className="px-2 absolute top-1/2 -translate-y-1/2 start-0 text-muted-foreground flex items-center gap-1">
            {startComponent}
          </div>
        )}
        {children}
        {endComponent && (
          <div className="px-2 absolute top-1/2 -translate-y-1/2 end-0 text-muted-foreground flex items-center gap-1">
            {endComponent}
          </div>
        )}
      </div>
    </FieldWrapper>
  );
}

export { FieldWrapperWithAccessory };
