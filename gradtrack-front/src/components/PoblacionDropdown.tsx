import React, { useState, useEffect } from "react";
import { Poblacion } from "my-types";
import "../styles/poblacionDropdownStyles.css";

type Props = {
  poblaciones: Poblacion[];
  onPoblacionSelect: (id: number) => void;
  disabled: boolean;
  selectedPoblacionId?: number | null;
};

const PoblacionFilter = ({ 
  poblaciones, 
  onPoblacionSelect, 
  disabled,
  selectedPoblacionId 
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPoblacion, setSelectedPoblacion] = useState<Poblacion | null>(null);
  
  useEffect(() => {
    if (selectedPoblacionId && poblaciones.length > 0) {
      const poblacion = poblaciones.find(p => p.id === selectedPoblacionId);
      if (poblacion) {
        setSelectedPoblacion(poblacion);
      }
    } else {
      setSelectedPoblacion(null);
    }
  }, [selectedPoblacionId, poblaciones]);

  const handleSelect = (poblacion: Poblacion) => {
    setSelectedPoblacion(poblacion);
    onPoblacionSelect(poblacion.id);
    setIsOpen(false);
  };

  return (
    <div className="poblacion-dropdown-container">
      <div className="poblacion-label">Población:</div>
      <div className={`poblacion-dropdown ${disabled ? 'disabled' : ''}`}>
        <div 
          className="poblacion-selected" 
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {selectedPoblacion ? 
            `Edad: ${selectedPoblacion.edad} años - Nivel Socioeconómico: ${selectedPoblacion.nivelSocioeconomico}` : 
            "Selecciona una población"}
          <span className="dropdown-arrow">▼</span>
        </div>
        
        {isOpen && !disabled && (
          <div className="poblacion-options">
            {poblaciones.map((poblacion) => (
              <div 
                key={poblacion.id} 
                className="poblacion-option" 
                onClick={() => handleSelect(poblacion)}
              >
                Edad: {poblacion.edad} años - Nivel Socioeconómico: {poblacion.nivelSocioeconomico}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PoblacionFilter;