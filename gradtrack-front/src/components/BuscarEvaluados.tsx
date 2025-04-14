import React from "react";

type Props = {
  searchTerm: string;
  onSearch: (term: string) => void;
};

const BuscarEvaluados: React.FC<Props> = ({ searchTerm, onSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Buscar evaluado por nombre..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default BuscarEvaluados;



