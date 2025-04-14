import { useState, useEffect } from "react";
import { Evaluado, Zona, Poblacion } from "my-types";
import { getAllEvaluados, getZonas, getPoblacionesByZona } from "../api/EvaluadoAPI";
import { deleteEvaluado } from "../api/EvaluadoAPI";
import DropdownZonas from "../components/ZonaDropdown";
import PoblacionFilter from "../components/PoblacionDropdown";
import BuscarEvaluados from "../components/BuscarEvaluados";
import List from "../components/List";

const ListEvaluadoPage = () => {
  const [zonaId, setZonaId] = useState<number | null>(null); // null = Todas las zonas
  const [poblacionId, setPoblacionId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [evaluados, setEvaluados] = useState<Evaluado[]>([]);
  const [filteredEvaluados, setFilteredEvaluados] = useState<Evaluado[]>([]);
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [poblaciones, setPoblaciones] = useState<Poblacion[]>([]);

  // Fetch evaluados y zonas al cargar
  useEffect(() => {
    getAllEvaluados().then((data: Evaluado[]) => {
      setEvaluados(data);
      setFilteredEvaluados(data); // Mostrar todos al inicio
    });
    getZonas().then((data: Zona[]) => setZonas(data));
  }, []);

  // Fetch poblaciones cuando se selecciona zona (y no es "Todas")
  useEffect(() => {
    if (zonaId) {
      getPoblacionesByZona(zonaId).then((data: Poblacion[]) => setPoblaciones(data));
    } else {
      setPoblaciones([]);
      setPoblacionId(null);
    }
  }, [zonaId]);

  // Filtrar evaluados
  useEffect(() => {
    let filtered = evaluados;
    
    // Filtrar por zona si está seleccionada (y no es "Todas")
    if (zonaId) {
      filtered = filtered.filter(evaluado => {
        const poblacion = poblaciones.find(p => p.id === evaluado.poblacionId);
        return poblacion && poblacion.zonaId === zonaId;
      });
    }

    // Filtrar por población si está seleccionada
    if (poblacionId) {
      filtered = filtered.filter(evaluado => evaluado.poblacionId === poblacionId);
    }

    // Filtrar por término de búsqueda
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
      <div className="flex flex-col gap-4 my-4 px-6">
        <h3 className="text-3xl font-bold text-gray-800 text-left">Lista de evaluados</h3>

        <DropdownZonas
          zonas={zonas}
          selectedZonaId={zonaId}
          onZonaSelect={(id) => {
            setZonaId(id);
            setPoblacionId(null);
          }}
        />

        {zonaId && ( // Solo mostrar filtro de población si hay zona seleccionada
          <PoblacionFilter
            poblaciones={poblaciones}
            onPoblacionSelect={(id) => setPoblacionId(id)}
            disabled={!zonaId}
          />
        )}

        <BuscarEvaluados
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />

        <div className="flex justify-end items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add evaluado
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto px-6 pb-10">
        {filteredEvaluados.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
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





