import { RefreshCcwIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

type Props = PropsWithChildren<{
  onRetry?: () => void;
  classNames?: Partial<{
    root: string;
    message: string;
  }>;
}>;

function ErrorMessage({ children, classNames, onRetry }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        classNames?.root,
      )}
    >
      <p
        className={cn(
          "text-muted-foreground italic text-center max-w-lg",
          classNames?.message,
        )}
      >
        {children}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary">
          Reintentar
          <RefreshCcwIcon size={20} />
        </Button>
      )}
    </div>
  );
}

export { ErrorMessage };
