import React, { useState } from "react";
import { Zona } from "my-types";
import "../styles/zonaDropdownStyles.css";

type Props = {
  zonas: Zona[];
  selectedZonaId: number | null;
  onZonaSelect: (id: number | null) => void;
};

const DropdownZonas: React.FC<Props> = ({ zonas, selectedZonaId, onZonaSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedZona = zonas.find(zona => zona.id === selectedZonaId);

  const handleSelect = (id: number | null) => {
    onZonaSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="zona-dropdown-container">
      <div className="zona-label">Zona:</div>
      <div
        className="zona-selected"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedZona ? `${selectedZona.nombre}, ${selectedZona.estado}` : "Todas las zonas"}
        <span className="dropdown-arrow">▼</span>
      </div>

      {isOpen && (
        <div className="zona-options">
          <div
            className="zona-option"
            onClick={() => handleSelect(null)}
          >
            Todas las zonas
          </div>
          {zonas.map((zona) => (
            <div
              key={zona.id}
              className="zona-option"
              onClick={() => handleSelect(zona.id)}
            >
              {zona.nombre}, {zona.estado}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownZonas;