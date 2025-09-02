import type { PropsWithChildren } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { User } from "./user";

function UserSkeleton() {
  return (
    <User.Wrapper>
      <UserSkeleton.Data>
        <UserSkeleton.Image />
      </UserSkeleton.Data>
      <User.FormWrapper>
        <UserSkeleton.Form />
      </User.FormWrapper>
    </User.Wrapper>
  );
}

function UserSkeletonData({ children }: PropsWithChildren) {
  return (
    <User.DataWrapper>
      {children}
      <Skeleton className="h-9 w-52 md:w-96 xl:w-full mt-3 md:mt-7" />
      <Skeleton className="h-8 w-52 mt-1" />
      <Skeleton className="h-8 w-24 mt-1" />
    </User.DataWrapper>
  );
}

function UserSkeletonImage() {
  return (
    <Skeleton className="size-52 lg:size-72 rounded-full" />
  );
}

function UserSkeletonForm() {
  return (
    <div className="grid grid-cols-2 gap-4 items-end w-full [&>div]:col-span-2">
      <Skeleton className="h-7 w-48 col-span-2" />

      <div className="!col-span-1 space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-9 w-full" />
      </div>

      <div className="!col-span-1 space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-full" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-9 w-full" />
      </div>

      <div className="col-span-2 space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-full" />
      </div>

      <div className="col-span-2 space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="col-span-2 space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-4 w-16" />
      </div>

      <Skeleton className="!col-span-1 h-10 w-full" />
      <Skeleton className="!col-span-1 h-10 w-full" />
    </div>
  );
}

UserSkeleton.Data = UserSkeletonData;
UserSkeleton.Image = UserSkeletonImage;
UserSkeleton.Form = UserSkeletonForm;

export { UserSkeleton };
