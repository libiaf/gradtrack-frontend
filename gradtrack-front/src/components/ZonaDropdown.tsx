import React from "react";
import { Zona } from "my-types";

type Props = {
  zonas: Zona[];
  selectedZonaId: number | null;
  onZonaSelect: (id: number | null) => void;
};

const DropdownZonas: React.FC<Props> = ({ zonas, selectedZonaId, onZonaSelect }) => {
  return (
    <div className="mb-4">
      <select
        className="w-full p-2 border border-gray-300 rounded"
        value={selectedZonaId || ""}
        onChange={(e) => onZonaSelect(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">Todas las zonas</option>
        {zonas.map((zona) => (
          <option key={zona.id} value={zona.id}>
            {zona.nombre} - {zona.estado}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownZonas;
