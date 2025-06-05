import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, UserRoundPen } from "lucide-react";

export function NavUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-sidebar-accent flex w-full items-center hover:cursor-pointer p-2 rounded-lg transition-[color,background,scale] data-[state=open]:scale-95 data-[state=open]:bg-sidebar-accent">
        <Avatar className="transition-[width,height] duration-200 ease-in-out">
          <AvatarImage src="" alt="user" />
          <AvatarFallback>IA</AvatarFallback>
        </Avatar>
        <span className="grid flex-1 text-left text-sm leading-tight ms-1 truncate font-semibold">Ignacio A.</span>
        <EllipsisVerticalIcon size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuItem className="gap-2 px-1">
          <UserRoundPen
            size={20}
            aria-hidden="true"
          />
          <span>Dashboard</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
