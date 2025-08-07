import { Badge } from "@/components/ui/badge";

type Props = {
  isDeleted: boolean;
};

function UserStatusBadge({ isDeleted }: Props) {
  return (
    <Badge variant={isDeleted ? "cancelled" : "confirmed"}>
      {isDeleted ? "Deshabilitado" : "Habilitado"}
    </Badge>
  );
}

export { UserStatusBadge };
