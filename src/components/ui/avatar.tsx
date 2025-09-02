import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { CameraIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 rounded-full border",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full rounded-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-secondary flex size-full items-center justify-center font-bold rounded-[inherit] text-xs",
        className,
      )}
      {...props}
    />
  );
}

function ChooseImage(props: React.ComponentProps<"input">) {
  const ref = React.useRef<HTMLInputElement>(null);
  return (
    <>
      <input {...props} ref={ref} hidden type="file" />
      <Button
        size="icon"
        onClick={() => ref.current?.click()}
        className="rounded-full absolute -bottom-4 right-1/2 translate-x-1/2 z-10"
      >
        <CameraIcon size={20} />
      </Button>
    </>
  );
}

Avatar.Fallback = AvatarFallback;
Avatar.ChooseImage = ChooseImage;
Avatar.Image = AvatarImage;

export { Avatar };
