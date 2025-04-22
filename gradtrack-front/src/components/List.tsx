import { Evaluado } from "my-types";
import { EyeIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import "../styles/listStyles.css";

type Props = {
  evaluados: Evaluado[];
  onDelete: (id: number) => void;
};

export default function List({ evaluados, onDelete }: Props) {
  const navigate = useNavigate();

  const handleViewDetails = (id: number) => {
    navigate(`/getdetalles/${id}`);
  };

  return (
    <div className="evaluado-table-container">
      <table className="evaluado-table">
        <thead className="sticky-header">
          <tr>
            <th scope="col" className="header-cell">
              ID
            </th>
            <th scope="col" className="header-cell">
              Nombre
            </th>
            <th scope="col" className="header-cell">
              Apellidos
            </th>
            <th scope="col" className="header-cell">
              Graduado
            </th>
            <th scope="col" className="header-cell text-center">
            </th>
          </tr>
        </thead>
        <tbody>
          {evaluados.map((evaluado) => (
            <tr key={evaluado.id} className="table-row">
              <td className="table-cell">
                {evaluado.id}
              </td>
              <td className="table-cell">
                {evaluado.nombre}
              </td>
              <td className="table-cell">
                {evaluado.apellidos}
              </td>
              <td className="table-cell">
                {evaluado.graduado}
              </td>
              <td className="table-cell">
                <div className="action-buttons-container">
                  <button className="action-button view-button" title="Ver detalles" onClick={() => handleViewDetails(evaluado.id)}>
                    <EyeIcon className="action-icon" /> 
                  </button>
                  <button 
                    className="action-button delete-button" 
                    onClick={() => onDelete(evaluado.id)} 
                    title="Eliminar"
                  >
                    <TrashIcon className="action-icon" /> 
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}