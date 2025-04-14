import api from ".";
import { Evaluado } from "my-types";

//GET ALL EVALUADOS
export const getAllEvaluados = async () => {
    try {
        const res = await api.get(`/evaluados/getallevaluados`);
        // console.log(res.data); -> for connection testing purpose
        const evaluados: Evaluado[] = await res.data.payload;
        return evaluados;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const deleteEvaluado = async (id: number) => {
    try {
      const res = await api.delete(`/evaluados/deleteevaluado`, {
        data: { id },
      });
      return res.data;
    } catch (error) {
      console.error("Error al eliminar persona:", error);
      throw error;
    }
  };

// PARA FILTROS
export const getZonas = async () => {
    try {
        const res = await api.get("/evaluados/zonas");
        return res.data.payload;
    } catch (error) {
        console.error("Error al obtener zonas:", error);
        return [];
    }
};

export const getPoblacionesByZona = async (zonaId: number) => {
  try {
      const res = await api.get(`/evaluados/poblaciones/${zonaId}`);
      return res.data.payload;
  } catch (error) {
      console.error("Error al obtener poblaciones:", error);
      return [];
  }
};
  