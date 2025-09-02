import {
  CircleAlertIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  severity?: "info" | "warn" | "error" | "success";
  className?: string;
}>;

function Alert({ severity = "info", children, className }: Props) {
  return (
    <div
      data-severity={severity}
      className={cn(
        "rounded-md px-4 py-3 text-sm flex gap-x-4",
        "data-[severity=info]:bg-blue-100 data-[severity=info]:text-blue-500",
        "data-[severity=error]:bg-red-100 data-[severity=error]:text-red-500",
        "data-[severity=success]:bg-green-100 data-[severity=success]:text-green-500",
        "data-[severity=warn]:bg-amber-100 data-[severity=warn]:text-amber-500",
        className,
      )}
    >
      <Icon severity={severity} />
      {children}
    </div>
  );
}

function Icon({ severity }: Pick<Props, "severity">) {
  switch (severity) {
    case "error":
      return (
        <CircleAlertIcon className="inline-flex" size={20} aria-hidden="true" />
      );
    case "info":
      return <InfoIcon className="inline-flex" size={20} aria-hidden="true" />;

    case "success":
      return (
        <CircleCheckIcon className="inline-flex" size={20} aria-hidden="true" />
      );

    case "warn":
      return (
        <TriangleAlertIcon
          className="inline-flex"
          size={20}
          aria-hidden="true"
        />
      );

    default:
      return null;
  }
}

export { Alert };
