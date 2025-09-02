import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

import { buttonVariants } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { ROUTES } from "@/lib/constants/routes";

import { userQuery } from "../container";
import { useUserFilters } from "../hooks/use-user-filters";
import { UserFilters } from "./user-filters";

function UserHeader() {
  const { filters } = useUserFilters();
  const { data: total = 0 } = useQuery(userQuery.total(filters));

  return (
    <header className="flex flex-col lg:flex-row items-center justify-between w-full">
      <PageTitle>
        {total} User
        {total > 1 ? "s" : ""}
      </PageTitle>

      <div className="flex items-center gap-2">
        <UserFilters />

        <Link
          to={{
            pathname: ROUTES.actions.create,
          }}
          className={buttonVariants({ className: "w-9 lg:w-max" })}
        >
          <span className="hidden lg:inline">Crear User</span>
          <PlusIcon size={20} />
        </Link>
      </div>
    </header>
  );
}

export { UserHeader };
