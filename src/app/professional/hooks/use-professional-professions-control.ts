import { useQueryProfessions } from "@/app/profession/hooks/use-query-professions";
import { ProfessionQueries } from "@/app/profession/queries/profession-queries";

import { useProfessionStore } from "../stores/use-professions-store";
import { useProfessionalProfessionsObserver } from "./use-professional-professions-observer";

export function useProfessionalProfessionsControl() {
  const professions = useProfessionStore(s => s.professions);
  const onAddProfession = useProfessionStore(s => s.onAddProfession);
  const onRemoveProfession = useProfessionStore(s => s.onRemoveProfession);
  const setProfessions = useProfessionStore(s => s.setProfessions);

  const { data: options = [] } = useQueryProfessions({ queryOptions: ProfessionQueries.forFitlers });
  useProfessionalProfessionsObserver({ onSave: setProfessions });

  const filteredOptions = options.filter(p => !professions.map(sp => sp.id).includes(Number(p.value)));

  const handleAddProfession = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const profession = options.find(o => o.value === value);

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
