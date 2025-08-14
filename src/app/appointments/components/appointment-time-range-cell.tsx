import { Table } from "@/components/ui/table";

type Props = {
  timeFrom: string;
  timeTo: string;
};

function AppointmentTimeRangeCell({ timeFrom, timeTo }: Props) {
  return (
    <>
      <Table.Cell
        className="p-2 bg-muted border-r text-xs align-baseline text-right text-muted-foreground relative"
      >
        <span className="absolute top-2 right-2">{timeFrom}</span>
        <span className="absolute bottom-2 right-2">{timeTo}</span>
      </Table.Cell>
    </>
  );
}

export { AppointmentTimeRangeCell };
