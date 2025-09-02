import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";

import type { UserProfessionModel, UserRoleModel } from "../models/user-model";

import { userQuery } from "../container";

type Props = {
  onSave: (data: {
    professions: UserProfessionModel[];
    roles: UserRoleModel[];
  }) => void;
};

export function useUserObserver({ onSave }: Props) {
  const { userUid } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userUid) {
      onSave({ professions: [], roles: [] });
      return;
    }

    const observer = new QueryObserver(queryClient, {
      ...userQuery.detail(userUid),
      select: ({ data }) => ({
        professions: data.professions,
        roles: data.role,
        // FIXME: trabajar esto cuando este ne BE como un arreglo
      }),
    });

    const result = observer.getCurrentResult();

    if (result.data) {
      onSave({
        professions: result.data.professions,
        roles: [result.data.roles],
        // FIXME: trabajar esto cuando este ne BE como un arreglo
      });
    }

    return () => {
      observer.destroy();
      onSave({ professions: [], roles: [] });
    };
  }, [queryClient, userUid, onSave]);
}
