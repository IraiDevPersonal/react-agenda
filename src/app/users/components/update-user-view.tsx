import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { ErrorMessage } from "@/components/ui/error-message";

import { userQuery } from "../container";
import { User } from "./user";
import { UserSkeleton } from "./user-skeleton";

function UpdateUserView() {
  const { userUid = "" } = useParams();
  const {
    refetch,
    data: user,
    isFetching,
    isLoading,
    isError,
    error,
  }
  = useQuery(userQuery.detail(userUid));

  if (isError) {
    return <ErrorMessage onRetry={refetch}>{error.message}</ErrorMessage>;
  }

  if (isLoading) {
    return <UserSkeleton />;
  }

  return (
    <>
      <User
        user={user?.data}
        // upsertService={payload => UserServices.update(userUid, payload)}
      >
        {
          isFetching
            ? (
                <UserSkeleton.Data>
                  <User.Image />
                </UserSkeleton.Data>
              )
            : (
                <User.Data>
                  <User.Image />
                </User.Data>
              )
        }
      </User>
    </>
  );
}

export { UpdateUserView };
