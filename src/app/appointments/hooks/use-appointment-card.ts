import { useNavigate } from "react-router";

import { ROUTES } from "@/lib/constants/routes";
import { getUrlData } from "@/lib/utils";

import { AppointmentStatus } from "../models/shared-model";

type Props = {
  uid: string;
  status: AppointmentStatus;
};

export function useAppointmentCard({ status, uid }: Props) {
  const navigate = useNavigate();

  const isAvailable = status === AppointmentStatus.AVAILABLE;

  const handleNavigate = () => {
    const { pathname, search } = getUrlData();

    if (pathname.includes(uid))
      return;
    navigate(`${ROUTES.agenda}/${uid}${search}`, { preventScrollReset: true, replace: true });
  };

  return {
    isAvailable,
    handleNavigate,
  };
}
