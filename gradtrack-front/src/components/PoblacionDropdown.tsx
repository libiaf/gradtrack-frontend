import { Poblacion } from "my-types";

type Props = {
  // zonaId: number | null;
  poblaciones: Poblacion[]; // Recibimos las poblaciones correspondientes a la zona
  onPoblacionSelect: (id: number) => void; // Función para manejar la selección de una población
  disabled: boolean; // Condición para habilitar/deshabilitar el dropdown
};

const PoblacionFilter = ({ poblaciones, onPoblacionSelect, disabled }: Props) => {
  return (
    <select
      onChange={(e) => onPoblacionSelect(Number(e.target.value))}
      disabled={disabled} // Se deshabilita si no hay zona seleccionada
      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled>
        Selecciona una población
      </option>
      {poblaciones.map((poblacion) => (
        <option key={poblacion.id} value={poblacion.id}>
          Edad: {poblacion.edad} años - Nivel Socioeconómico: {poblacion.nivelSocioeconomico}
        </option>
      ))}
    </select>
  );
};

export default PoblacionFilter;
