import { CheckCheckIcon, CopyIcon } from "lucide-react";

import { useClipboard } from "@/hooks/use-clipboard";

import { Button } from "./button";

type Props = {
  value: string;
};

function CopyButton({ value, ...props }: React.ComponentProps<"button"> & Props) {
  const [copyValue, copyFn] = useClipboard({ withState: true, clearCopyDelay: 1000 });
  return (
    <Button {...props} size="icon" variant="ghost" onClick={() => copyFn(value)}>
      {copyValue
        ? <CheckCheckIcon size={20} />
        : <CopyIcon size={20} />}
    </Button>
  );
}

export { CopyButton };
