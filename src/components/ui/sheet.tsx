"use client";

import type { VariantProps } from "class-variance-authority";
import type { HTMLMotionProps, Transition } from "motion/react";

import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import {
  AnimatePresence,

  motion,

} from "motion/react";
import { Dialog as SheetPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

type SheetContextType = {
  isOpen: boolean;
  hideCloseButton: boolean;
};

const SheetContext = React.createContext<SheetContextType | undefined>(
  undefined,
);

function useSheet(): SheetContextType {
  const context = React.use(SheetContext);
  if (!context) {
    throw new Error("useSheet must be used within a Sheet");
  }
  return context;
}

type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root> &
  Partial<Pick<SheetContextType, "hideCloseButton">>;

function Sheet({ children, hideCloseButton = false, ...props }: SheetProps) {
  const [isOpen, setIsOpen] = React.useState(
    props?.open ?? props?.defaultOpen ?? false,
  );

  React.useEffect(() => {
    if (props?.open !== undefined)
      setIsOpen(props.open);
  }, [props?.open]);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      setIsOpen(open);
      props.onOpenChange?.(open);
    },
    [props],
  );

  return (
    <SheetContext value={{ isOpen, hideCloseButton }}>
      <SheetPrimitive.Root
        data-slot="sheet"
        {...props}
        onOpenChange={handleOpenChange}
      >
        {children}
      </SheetPrimitive.Root>
    </SheetContext>
  );
}

type SheetTriggerProps = React.ComponentProps<typeof SheetPrimitive.Trigger>;

function SheetTrigger(props: SheetTriggerProps) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>;

function SheetClose(props: SheetCloseProps) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

type SheetPortalProps = React.ComponentProps<typeof SheetPrimitive.Portal>;

function SheetPortal(props: SheetPortalProps) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

type SheetOverlayProps = React.ComponentProps<typeof SheetPrimitive.Overlay>;

function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn("fixed inset-0 z-50 bg-black/80", className)}
      {...props}
    />
  );
}

const sheetVariants = cva("flex flex-col fixed z-50 gap-4 bg-background py-4 px-6 shadow-lg", {
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b",
      bottom: "inset-x-0 bottom-0 border-t",
      left: "inset-y-0 left-0 h-svh w-max border-r",
      right: "inset-y-0 right-0 h-svh w-max border-l",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetVariants> &
  HTMLMotionProps<"div"> & {
    transition?: Transition;
    overlay?: boolean;
  };

const DEFAULT_TRANSITION: Transition = { type: "spring", stiffness: 150, damping: 25 };

function SheetContent({
  transition = DEFAULT_TRANSITION,
  overlay = true,
  side = "right",
  className,
  children,
  ...props
}: SheetContentProps) {
  const { isOpen, hideCloseButton } = useSheet();

  return (
    <AnimatePresence>
      {isOpen && (
        <SheetPortal forceMount data-slot="sheet-portal">
          {overlay && (
            <SheetOverlay asChild forceMount>
              <motion.div
                key="sheet-overlay"
                data-slot="sheet-overlay"
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            </SheetOverlay>
          )}
          <SheetPrimitive.Content asChild forceMount {...props}>
            <motion.div
              key="sheet-content"
              data-slot="sheet-content"
              initial={
                side === "right"
                  ? { x: "100%", opacity: 0 }
                  : side === "left"
                    ? { x: "-100%", opacity: 0 }
                    : side === "top"
                      ? { y: "-100%", opacity: 0 }
                      : { y: "100%", opacity: 0 }
              }
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={
                side === "right"
                  ? { x: "100%", opacity: 0 }
                  : side === "left"
                    ? { x: "-100%", opacity: 0 }
                    : side === "top"
                      ? { y: "-100%", opacity: 0 }
                      : { y: "100%", opacity: 0 }
              }
              transition={transition}
              className={cn(sheetVariants({ side }), className)}
              {...props}
            >
              {/* para evitar la advertencia en consola */}
              <Sheet.Description hidden></Sheet.Description>
              {children}
              {!hideCloseButton && (
                <SheetPrimitive.Close
                  data-slot="sheet-close"
                  className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </SheetPrimitive.Close>
              )}
            </motion.div>
          </SheetPrimitive.Content>
        </SheetPortal>
      )}
    </AnimatePresence>
  );
}

type SheetHeaderProps = React.ComponentProps<"div">;

function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
}

type SheetFooterProps = React.ComponentProps<"div">;

function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-auto",
        className,
      )}
      {...props}
    />
  );
}

type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>;

function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  );
}

type SheetDescriptionProps = React.ComponentProps<
  typeof SheetPrimitive.Description
>;

function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

Sheet.Close = SheetClose;
Sheet.Content = SheetContent;
Sheet.Description = SheetDescription;
Sheet.Footer = SheetFooter;
Sheet.Header = SheetHeader;
Sheet.Overlay = SheetOverlay;
Sheet.Portal = SheetPortal;
Sheet.Title = SheetTitle;
Sheet.Trigger = SheetTrigger;

export { Sheet };
