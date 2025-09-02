import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";

import type { UserProfessionModel, UserRoleModel } from "../models/user-model";

import { userQuery } from "../container";

type Props = {
  setData: (data: {
    professions: UserProfessionModel[];
    roles: UserRoleModel[];
  }) => void;
};

export function useUserObserver({ setData }: Props) {
  const { userUid } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userUid) {
      setData({ professions: [], roles: [] });
      return;
    }

    const observer = new QueryObserver(queryClient, {
      ...userQuery.detail(userUid),
      select: ({ data }) => ({
        professions: data.professions,
        roles: data.roles,
      }),
    });

    const result = observer.getCurrentResult();

    if (result.data) {
      setData({
        professions: result.data.professions ?? [],
        roles: result.data.roles,
      });
    }

    return () => {
      observer.destroy();
      setData({ professions: [], roles: [] });
    };
  }, [queryClient, userUid, setData]);
}
