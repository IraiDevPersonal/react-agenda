type Props = {
  appointmentId: string;
};

function AppointmentDetail({ appointmentId }: Props) {
  return (
    <div className="p-4 w-2xl">
      {appointmentId}
    </div>
  );
}

export { AppointmentDetail };
