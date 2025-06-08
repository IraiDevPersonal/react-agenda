import { EllipsisVerticalIcon, LogOutIcon, UserRoundPenIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-primary text-accent hover:bg-primary/90 flex w-full items-center hover:cursor-pointer p-2 rounded-lg transition-[color,background,scale] data-[state=open]:scale-95 data-[state=open]:bg-primary/90">
        <Avatar className="transition-[width,height] duration-200 ease-in-out">
          <AvatarImage src="" alt="user" />
          <AvatarFallback className="bg-neutral-300 text-primary">IA</AvatarFallback>
        </Avatar>
        <span className="grid flex-1 text-left text-sm leading-tight ms-3 truncate font-semibold">Ignacio A.</span>
        <EllipsisVerticalIcon size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="center"
        sideOffset={4}
      >
        <DropdownMenuItem className="gap-2 px-1">
          <UserRoundPenIcon
            size={20}
            aria-hidden="true"
          />
          <span>Mi Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 px-1">
          <LogOutIcon
            size={20}
            aria-hidden="true"
          />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
