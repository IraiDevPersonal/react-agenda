import type { PropsWithChildren } from "react";

import { Loader2Icon, Trash2Icon } from "lucide-react";

import { Button } from "./button";
import { Dialog } from "./dialog";
import { DefaultTooltip } from "./tooltip";

type Props = PropsWithChildren<{
  onOpenChange?: (open: boolean) => void;
  onAction: () => void;
  icon?: React.ReactNode;
  buttonsLabel?: Partial<{
    cancel: string;
    action: string;
  }>;
  isLoading?: boolean;
  disabled?: boolean;
  open?: boolean;
}>;

const DEFAULT_ICON = <Trash2Icon size={20} />;

function ButtonWithAlertDialog({
  icon = DEFAULT_ICON,
  isLoading = false,
  buttonsLabel,
  disabled,
  children,
  onAction,
  ...props
}: Props) {
  return (
    <>
      <Dialog {...props}>
        <DefaultTooltip content={buttonsLabel?.action ?? "Eliminar"}>
          <Dialog.Trigger asChild>
            <Button variant="ghost" size="icon" disabled={disabled}>
              {isLoading
                ? <Loader2Icon size={20} className="animate-spin" />
                : icon}
            </Button>
          </Dialog.Trigger>
        </DefaultTooltip>

        <Dialog.Content hiddeCloseButton className="p-2 pt-4">
          <Dialog.Title hidden></Dialog.Title>

          <Dialog.Description className="text-primary text-bases p-2">
            {children}
          </Dialog.Description>

          <Dialog.Footer className="grid grid-cols-2 gap-2">
            <Dialog.Close asChild>
              <Button variant="secondary" disabled={isLoading || disabled}>
                {buttonsLabel?.cancel ?? "Cancelar"}
              </Button>
            </Dialog.Close>
            <Button
              disabled={isLoading || disabled}
              onClick={onAction}
              variant="default"
            >
              {isLoading
                ? <Loader2Icon size={20} className="animate-spin" />
                : icon}
              <span>{buttonsLabel?.action ?? "Eliminar"}</span>
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

    </>
  );
}

export { ButtonWithAlertDialog };
