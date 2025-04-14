import { useState, useEffect } from "react";
import { Evaluado, Zona, Poblacion } from "my-types";
import { getAllEvaluados, getZonas, getPoblacionesByZona } from "../api/EvaluadoAPI";
import { deleteEvaluado } from "../api/EvaluadoAPI";
import { Link } from "react-router-dom";
import "../styles/listEvaluadoStyles.css";
import Header from "../components/Header";

const ListEvaluadoPage = () => {
  const [zonaId, setZonaId] = useState<number | null>(null);
  const [poblacionId, setPoblacionId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [evaluados, setEvaluados] = useState<Evaluado[]>([]);
  const [filteredEvaluados, setFilteredEvaluados] = useState<Evaluado[]>([]);
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [poblaciones, setPoblaciones] = useState<Poblacion[]>([]);
  const [selectedZona, setSelectedZona] = useState<string>("San Pedro, Sonora");
  const [poblacionInfo, setPoblacionInfo] = useState({ edad: "29 años", nivelSocioeconomico: "Medio" });

  useEffect(() => {
    getAllEvaluados().then((data: Evaluado[]) => {
      setEvaluados(data);
      setFilteredEvaluados(data);
    });
    getZonas().then((data: Zona[]) => setZonas(data));
  }, []);

  useEffect(() => {
    if (zonaId) {
      getPoblacionesByZona(zonaId).then((data: Poblacion[]) => setPoblaciones(data));
    } else {
      setPoblaciones([]);
      setPoblacionId(null);
    }
  }, [zonaId]);

  useEffect(() => {
    let filtered = evaluados;
    
    if (zonaId) {
      filtered = filtered.filter(evaluado => {
        const poblacion = poblaciones.find(p => p.id === evaluado.poblacionId);
        return poblacion && poblacion.zonaId === zonaId;
      });
    }

    if (poblacionId) {
      filtered = filtered.filter(evaluado => evaluado.poblacionId === poblacionId);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(evaluado =>
        `${evaluado.nombre} ${evaluado.apellidos}`.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvaluados(filtered);
  }, [zonaId, poblacionId, searchTerm, evaluados, poblaciones]);

  const handleDelete = async (id: number) => {
    try {
      await deleteEvaluado(id);
      setEvaluados(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Header title="Evaluados"/>
    <div className="list-evaluado-container">
      <div className="add-evaluado-btn-container">
        <button className="add-evaluado-btn">
          Agregar evaluado
        </button>
      </div>
      
      <div className="filters-container">
        <div className="search-bar-container">
          <input 
            type="text" 
            className="search-evaluado" 
            placeholder="Buscar evaluado..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="zone-poblacion-filters">
          <div className="zona-filter">
            <label>Zona:</label>
            <div className="dropdown">
              <select 
                className="zona-select"
                value={selectedZona}
                onChange={(e) => {
                  setSelectedZona(e.target.value);
                  // Logic to set zonaId based on selection would go here
                }}
              >
                <option value="San Pedro, Sonora">San Pedro, Sonora</option>
                {/* Other zona options would be populated here */}
              </select>
            </div>
          </div>
          
          <div className="poblacion-filter">
            <label>Población:</label>
            <div className="poblacion-info">
              <div>Edad: {poblacionInfo.edad}</div>
              <div>Nivel Socioeconómico: {poblacionInfo.nivelSocioeconomico}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="table-container">
        <table className="evaluados-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredEvaluados.length > 0 ? (
              evaluados.map((evaluado) => (
                <tr key={evaluado.id}>
                  <td>{evaluado.id}</td>
                  <td>{evaluado.nombre}</td>
                  <td>{evaluado.apellidos}</td>
                  <td className="actions-cell">
                    <button className="action-btn details-btn">
                      <i className="fas fa-ellipsis-h"></i>
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(evaluado.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-results">
                  {searchTerm.trim() !== "" 
                    ? "No se encontraron evaluados con el término de búsqueda" 
                    : "No hay evaluados para mostrar con los filtros actuales"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default ListEvaluadoPage;





