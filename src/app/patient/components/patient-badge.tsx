import { Badge } from "@/components/ui/badge";

type Props = {
  isDeleted: boolean;
};

function PatientBadge({ isDeleted }: Props) {
  return (
    <Badge variant={isDeleted ? "cancelled" : "confirmed"}>
      {isDeleted ? "Deshabilitado" : "Habilitado"}
    </Badge>
  );
}

export { PatientBadge };
