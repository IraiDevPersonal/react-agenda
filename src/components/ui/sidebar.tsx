import { BookUserIcon, CalendarIcon, UsersIcon } from "lucide-react";
import { NavLink } from "react-router";

import { NavUser } from "@/app/profile/components/nav-user";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

import { For } from "../for";

const PATHS = [
  { href: ROUTES.agenda, label: "Mi agenda", icon: <CalendarIcon size={20} /> },
  { href: ROUTES.patients, label: "Pacientes", icon: <UsersIcon size={20} /> },
  { href: ROUTES.users, label: "Usuarios", icon: <BookUserIcon size={20} /> },
];

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 lg:static flex p-4 space-y-8 bg-sidebar min-w-64 w-64 flex-col h-dvh">
      <header>
        <h3 className="text-3xl font-bold italic">Agenda</h3>
      </header>

      <div className="grow-[1] space-y-2">
        <span className="text-muted-foreground">Menú</span>
        <ul className="space-y-1">
          <For items={PATHS}>
            {path => (
              <li key={path.href} className="w-full">
                <NavLink
                  to={path.href}
                  className={({ isActive }) => cn(
                    "p-2 rounded-lg flex hover:bg-primary/5 transition-colors font-semibold gap-x-2",
                    "hover:[&_svg]:scale-[115%] [&_svg]:transition-transform [&_svg]:antialiased",
                    isActive && "bg-primary text-accent hover:bg-primary/90",
                  )}
                >
                  {path.icon}
                  <span>{path.label}</span>
                </NavLink>
              </li>
            )}
          </For>
        </ul>
      </div>

      <footer>
        <NavUser />
      </footer>
    </aside>
  );
}
