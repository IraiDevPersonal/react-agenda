import type { PropsWithChildren } from "react";

import { Skeleton } from "@/components/ui/skeleton";

function PatientSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-full gap-x-4 lg:gap-x-8">
      <PatientSkeleton.Data>
        <PatientSkeleton.Image />
      </PatientSkeleton.Data>
      <div className="max-w-lg min-w-lg lg:border-l md:pl-4 lg:pl-8">
        <PatientSkeleton.Form />
      </div>
    </div>
  );
}

function PatientSkeletonData({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center">
      {children}
      <Skeleton className="h-8 w-64 mt-4 md:mt-8" />
      <Skeleton className="h-4 w-56 mt-2" />
      <Skeleton className="h-4 w-32 mt-2" />
    </div>
  );
}

function PatientSkeletonImage() {
  return (
    <div>
      <Skeleton className="size-52 lg:size-72 rounded-full" />
      <Skeleton className="h-4 w-40 mt-8 mx-auto" />
    </div>
  );
}

function PatientSkeletonForm() {
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

      <Skeleton className="!col-span-1 h-10 w-full" />
      <Skeleton className="!col-span-1 h-10 w-full" />
    </div>
  );
}

PatientSkeleton.Data = PatientSkeletonData;
PatientSkeleton.Image = PatientSkeletonImage;
PatientSkeleton.Form = PatientSkeletonForm;

export { PatientSkeleton };
