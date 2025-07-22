import { PageTitle } from "@/components/ui/page-title";

function PatientHeader() {
  return (
    <header className="flex items-end justify-between w-full">
      <div>
        <PageTitle>Pacientes</PageTitle>
        <span className="font-semibold">Total: 123</span>
      </div>
      <span>filtros</span>
    </header>
  );
}

export { PatientHeader };
