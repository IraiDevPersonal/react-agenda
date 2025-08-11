import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";

import type { ProfessionalProfessionModel, ProfessionalRoleModel } from "../domain/models/professional-model";

import { professionalQuery } from "../container";

type Props = {
  onSave: (data: {
    professions: ProfessionalProfessionModel[];
    roles: ProfessionalRoleModel[];
  }) => void;
};

export function useProfessionalObserver({ onSave }: Props) {
  const { professionalUid } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!professionalUid) {
      onSave({ professions: [], roles: [] });
      return;
    }

    const observer = new QueryObserver(queryClient, {
      ...professionalQuery.detail(professionalUid),
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
  }, [queryClient, professionalUid, onSave]);
}
