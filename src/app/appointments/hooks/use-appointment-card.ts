import { useNavigate } from "react-router";

import { ROUTES } from "@/lib/constants/routes";
import { getUrlData } from "@/lib/utils";

import type { AppointmentModel } from "../models/appointment-model";

import { AppointmentStatus } from "../models/shared-model";

export function useAppointmentCard({ appointment_status, uid }: Pick<AppointmentModel, "appointment_status" | "uid">) {
  const navigate = useNavigate();

  const isAvailable = appointment_status === AppointmentStatus.AVAILABLE;

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
