import { useState, useEffect } from "react";
import { Evaluado, Zona, Poblacion } from "my-types";
import { getAllEvaluados, getZonas, getPoblacionesByZona } from "../api/EvaluadoAPI";
import { deleteEvaluado } from "../api/EvaluadoAPI";
import DropdownZonas from "../components/ZonaDropdown";
import PoblacionFilter from "../components/PoblacionDropdown";
import BuscarEvaluados from "../components/BuscarEvaluados";
import List from "../components/List";
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
      <Header title="Evaluados" />
      <div className="evaluado-container">
        <div className="evaluado-header">
          <h3 className="evaluado-title">Lista de evaluados</h3>
          <button className="add-evaluado-btn">
            Agregar evaluado
          </button>
        </div>

        <div className="search-container">
          <BuscarEvaluados
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
        </div>

        <div className="filters-container">
          <div className="filter-zona">
            <span className="filter-label">Zona:</span>
            <DropdownZonas
              zonas={zonas}
              selectedZonaId={zonaId}
              onZonaSelect={(id) => {
                setZonaId(id);
                setPoblacionId(null);
              }}
            />
          </div>

          {zonaId && (
            <div className="filter-poblacion">
              <span className="filter-label">Población:</span>
              <PoblacionFilter
                poblaciones={poblaciones}
                onPoblacionSelect={(id) => setPoblacionId(id)}
                disabled={!zonaId}
              />
            </div>
          )}
        </div>

        <div className="evaluado-table-container">
          {filteredEvaluados.length === 0 ? (
            <div className="no-results">
              {searchTerm.trim() !== "" 
                ? "No se encontraron evaluados con el término de búsqueda" 
                : "No hay evaluados para mostrar con los filtros actuales"}
            </div>
          ) : (
            <List evaluados={filteredEvaluados} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </>
  );
};

export default ListEvaluadoPage;