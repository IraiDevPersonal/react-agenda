import { For } from "@/components/for";
import { Skeleton } from "@/components/ui/skeleton";

import { AppointmentDetailWrapper } from "./appointment-detail-wrapper";

export function AppointmentDetailSkeleton() {
  return (
    <AppointmentDetailWrapper>
      <div className="flex items-center w-full pt-2">
        <Skeleton className="h-7 w-72" />
        <Skeleton className="h-6 w-24 ml-auto rounded-full" />
      </div>

      <Skeleton className="h-[74px] w-full" />

      <div className="space-y-2 pt-1">
        <Skeleton className="h-6 w-44" />
        <For items={[1, 2, 3, 4]}>
          {(n) => (
            <div key={n} className="space-y-1">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          )}
        </For>
      </div>

      <Skeleton className="h-11 w-full" />
    </AppointmentDetailWrapper>
  );
}
