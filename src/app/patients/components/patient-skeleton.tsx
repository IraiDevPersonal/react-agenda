import type { PropsWithChildren } from "react";

import { Skeleton } from "@/components/ui/skeleton";

import { Patient } from "./patient";

function PatientSkeleton() {
  return (
    <Patient.Wrapper>
      <PatientSkeleton.Data>
        <PatientSkeleton.Image />
      </PatientSkeleton.Data>
      <Patient.FormWrapper>
        <PatientSkeleton.Form />
      </Patient.FormWrapper>
    </Patient.Wrapper>
  );
}

function PatientSkeletonData({ children }: PropsWithChildren) {
  return (
    <Patient.DataWrapper>
      {children}
      <Skeleton className="h-9 w-64 mt-3 md:mt-7" />
      <Skeleton className="h-8 w-52 mt-1" />
    </Patient.DataWrapper>
  );
}

function PatientSkeletonImage() {
  return (
    <Skeleton className="size-52 lg:size-72 rounded-full" />
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
