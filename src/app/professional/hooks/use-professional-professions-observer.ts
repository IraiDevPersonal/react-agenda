import { QueryObserver, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";

import type { ProfessionalProfessionModel } from "../models/professional-model";

import { ProfessionalQuery } from "../queries/professional-queries";

type Props = {
  onSave: (professions: ProfessionalProfessionModel[]) => void;
};

export function useProfessionalProfessionsObserver({ onSave }: Props) {
  const { professionalUid } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!professionalUid)
      return;

    const observer = new QueryObserver(queryClient, {
      ...ProfessionalQuery.getDetail(professionalUid),
      select: data => data.data.professions,
    });

    const result = observer.getCurrentResult();

    if (result.data) {
      onSave(result.data);
    }
  }, [queryClient, professionalUid, onSave]);
}
