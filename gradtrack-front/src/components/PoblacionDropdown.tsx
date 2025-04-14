import { Poblacion } from "my-types";

type Props = {
  poblaciones: Poblacion[];
  onPoblacionSelect: (id: number) => void;
  disabled: boolean;
};

const PoblacionFilter = ({ poblaciones, onPoblacionSelect, disabled }: Props) => {
  return (
    <select
      onChange={(e) => onPoblacionSelect(Number(e.target.value))}
      disabled={disabled}
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
