import { CalendarIcon, FileIcon, UsersIcon } from "lucide-react";
import { NavLink } from "react-router";

import { NavUser } from "@/app/user/components/nav-user";
import { Routes } from "@/constants/routes.constant";
import { cn } from "@/lib/utils";

const Paths = [
  { href: Routes.agenda, label: "Agenda", icon: <CalendarIcon size={20} /> },
  { href: Routes.patients, label: "Pacientes", icon: <UsersIcon size={20} /> },
  { href: Routes.reports, label: "Informes", icon: <FileIcon size={20} /> },
];

export function Sidebar() {
  return (
    <aside className="p-4 space-y-8 bg-sidebar w-64 flex flex-col">
      <div>
        <span className="text-3xl font-bold italic">Agenda</span>
      </div>

      <div className="grow-[1] space-y-2">
        <h5 className="text-muted-foreground">General</h5>
        <ul className="space-y-1">
          {
            Paths.map(path => (
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
                  {path.label}
                </NavLink>
              </li>
            ))
          }
        </ul>
      </div>

      <div>
        <NavUser />
      </div>
    </aside>
  );
}
