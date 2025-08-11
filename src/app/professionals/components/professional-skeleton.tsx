import type { PropsWithChildren } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { Professional } from "./professional";

function ProfessionalSkeleton() {
  return (
    <Professional.Wrapper>
      <ProfessionalSkeleton.Data>
        <ProfessionalSkeleton.Image />
      </ProfessionalSkeleton.Data>
      <Professional.FormWrapper>
        <ProfessionalSkeleton.Form />
      </Professional.FormWrapper>
    </Professional.Wrapper>
  );
}

function ProfessionalSkeletonData({ children }: PropsWithChildren) {
  return (
    <Professional.DataWrapper>
      {children}
      <Skeleton className="h-9 w-52 md:w-96 xl:w-full mt-3 md:mt-7" />
      <Skeleton className="h-8 w-52 mt-1" />
      <Skeleton className="h-8 w-24 mt-1" />
    </Professional.DataWrapper>
  );
}

function ProfessionalSkeletonImage() {
  return (
    <Skeleton className="size-52 lg:size-72 rounded-full" />
  );
}

function ProfessionalSkeletonForm() {
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

ProfessionalSkeleton.Data = ProfessionalSkeletonData;
ProfessionalSkeleton.Image = ProfessionalSkeletonImage;
ProfessionalSkeleton.Form = ProfessionalSkeletonForm;

export { ProfessionalSkeleton };
