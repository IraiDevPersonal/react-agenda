import type { ViewTypes } from "../types/view.type";

import { MonthView } from "./month-view";

type ViewSelectorProps = {
  view: ViewTypes;
  date: Date;
};

export function ViewSelector({ view, date }: ViewSelectorProps) {
  return (
    <>
      {view === "month" && <MonthView date={date} />}
    </>
  );
}
