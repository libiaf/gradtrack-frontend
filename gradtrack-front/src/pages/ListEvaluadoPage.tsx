import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Evaluado, Zona, Poblacion } from "my-types";
import { getAllEvaluados, getZonas, getPoblacionesByZona } from "../api/EvaluadoAPI";
import { deleteEvaluado } from "../api/EvaluadoAPI";
import DropdownZonas from "../components/ZonaDropdown";
import PoblacionFilter from "../components/PoblacionDropdown";
import BuscarEvaluados from "../components/BuscarEvaluados";
import List from "../components/List";
import Header from "../components/Header";
import "../styles/listEvaluadoStyles.css";

const ListEvaluadoPage = () => {
  const navigate = useNavigate();
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
      getPoblacionesByZona(zonaId).then((data: Poblacion[]) => {
        setPoblaciones(data);
        if (data.length > 0) {
          setPoblacionId(data[0].id);
        } else {
          setPoblacionId(null);
        }
      });
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

  const handleAgregarEvaluado = () => {
    navigate("/agregar-evaluado", { 
      state: { 
        zonaId, 
        poblacionId 
      } 
    });
  };


  return (
    <>
      <Header title="Evaluados" />

      <div className="flex flex-col gap-4 my-4 px-6">
        <h3 className="text-3xl font-bold text-gray-800 text-left">Lista de evaluados</h3>

        <div className="flex flex-row gap-4">
          <DropdownZonas
            zonas={zonas}
            selectedZonaId={zonaId}
            onZonaSelect={(id) => {
              setZonaId(id);
            }}
          />

          {zonaId && (
            <PoblacionFilter
              poblaciones={poblaciones}
              onPoblacionSelect={(id) => setPoblacionId(id)}
              disabled={!zonaId}
              selectedPoblacionId={poblacionId}
            />
          )}
        </div>

        <BuscarEvaluados
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />

        <div className="flex justify-end items-center mb-4">
          <button 
            className="add-evaluado-btn" 
            onClick={handleAgregarEvaluado}
            disabled={!zonaId || !poblacionId}
            style={{ 
              opacity: (!zonaId || !poblacionId) ? 0.5 : 1,
              cursor: (!zonaId || !poblacionId) ? 'not-allowed' : 'pointer'
            }}
          >
            Agregar evaluado
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto px-6 pb-10">
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
    </>
  );
};

export default ListEvaluadoPage;