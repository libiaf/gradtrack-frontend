import Filter from "../components/Filter";
import List from "../components/List";
import Header from "../components/Header";

import { Evaluado } from "my-types";
import { useState, useEffect } from "react";
import { deleteEvaluado, getAllEvaluados } from "../api/EvaluadoAPI";

const ListPerson = () => {
  const [name, setName] = useState<string>("");
  const [graduado, setGraduado] = useState<string>("All");
  const [evaluados, setEvaluados] = useState<Evaluado[]>([]);

  const handleDelete = async (id: number) => {
    try {
      await deleteEvaluado(id); 
      setEvaluados((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = evaluados.filter((evaluado) => {
    return (
      (graduado === "All" || evaluado.graduado === graduado) &&
      evaluado.nombre.toLowerCase().includes(name.toLowerCase())
    );
  });

  useEffect(() => {
    getAllEvaluados().then((data: Evaluado[]) => setEvaluados(data));
  }, []);

  return (
    <>
      <Header title="Evaluados"/>

      <div className="flex flex-col gap-4 my-4 px-6">
        <h3 className="text-3xl font-bold text-gray-800 text-left">Lista de evaluados</h3>
        <div className="h-4"></div>

        <Filter
          graduado={graduado}
          setGraduado={setGraduado}
          name={name}
          setName={setName}
        />

        <div className="flex justify-end items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add evaluado
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto px-6 pb-10">
        <List evaluados={filteredProducts} onDelete={handleDelete} />
      </div>
    </>
  );
};

export default ListPerson;

