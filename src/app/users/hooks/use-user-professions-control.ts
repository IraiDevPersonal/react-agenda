import { useQuery } from "@tanstack/react-query";

import { professionQuery } from "@/app/professions/container";

import { useProfessionStore } from "../stores/professions-store";
import { useUserObserver } from "./use-user-observer";

export function useUserProfessionsControl() {
  const professions = useProfessionStore((s) => s.professions);
  const setProfessions = useProfessionStore((s) => s.setProfessions);
  const onAddProfession = useProfessionStore((s) => s.onAddProfession);
  const onRemoveProfession = useProfessionStore((s) => s.onRemoveProfession);

  useUserObserver({
    setData: ({ professions }) => setProfessions(professions),
  });

  const { data: options = [] } = useQuery(professionQuery.forFitlers());

  const filteredOptions = options.filter(
    (p) => !professions.map((sp) => sp.id).includes(Number(p.value)),
  );

  const handleAddProfession = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const profession = options.find((o) => o.value === value);

    if (profession) {
      onAddProfession({
        id: Number(profession.value),
        name: profession.label,
      });
    }
  };

  const handleRemoveProfession = (id: number) => {
    onRemoveProfession(id);
  };

  return {
    handleAddProfession,
    handleRemoveProfession,
    options: filteredOptions,
    professions,
  };
}
