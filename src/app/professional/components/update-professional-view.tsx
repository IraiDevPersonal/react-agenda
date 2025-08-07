import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { ErrorMessage } from "@/components/ui/error-message";

import { ProfessionalQueries } from "../queries/professional-queries";
import { Professional } from "./professional";
import { ProfessionalSkeleton } from "./professional-skeleton";

function UpdateProfessionalView() {
  const { professionalUid = "" } = useParams();
  const {
    refetch,
    data: professional,
    isFetching,
    isLoading,
    isError,
    error,
  }
  = useQuery(ProfessionalQueries.getDetail(professionalUid));

  if (isError) {
    return <ErrorMessage onRetry={refetch}>{error.message}</ErrorMessage>;
  }

  if (isLoading) {
    return <ProfessionalSkeleton />;
  }

  return (
    <>
      <Professional
        professional={professional?.data}
        // upsertService={payload => ProfessionalServices.update(professionalUid, payload)}
      >
        {
          isFetching
            ? (
                <ProfessionalSkeleton.Data>
                  <Professional.Image />
                </ProfessionalSkeleton.Data>
              )
            : (
                <Professional.Data>
                  <Professional.Image />
                </Professional.Data>
              )
        }
      </Professional>
    </>
  );
}

export { UpdateProfessionalView };
