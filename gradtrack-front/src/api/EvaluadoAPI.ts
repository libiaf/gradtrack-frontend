import api from ".";
import { Evaluado } from "my-types";

//GET ALL EVALUADOS
export const getAllEvaluados = async () => {
    try {
        const res = await api.get(`/evaluados/getallevaluados`);
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

// PARA DASHBOARD

export const getTotalEvaluados = async (poblacionId: string) => {
  try {
    const res = await api.get(`/evaluados/totalEvaluados/${poblacionId}`);
    return res.data;
  } catch (error) {
    console.error('Error al obtener total de evaluados:', error);
    throw error;
  }
};

export const getPorcentajeGraduacion = async (poblacionId: string) => {
  try {
    const res = await api.get(`/evaluados/graduacion/${poblacionId}`);
    return res.data;
  } catch (error) {
    console.error('Error al obtener porcentaje de graduación:', error);
    throw error;
  }
};

export const getGraduacionHombres = async (poblacionId: string) => {
  try {
    const res = await api.get(`/evaluados/graduacion/hombres/${poblacionId}`);
    return res.data;
  } catch (error) {
    console.error('Error al obtener graduación de hombres:', error);
    throw error;
  }
};

export const getGraduacionMujeres = async (poblacionId: string) => {
  try {
    const res = await api.get(`/evaluados/graduacion/mujeres/${poblacionId}`);
    return res.data;
  } catch (error) {
    console.error('Error al obtener graduación de mujeres:', error);
    throw error;
  }
};

export const getNivelAlerta = async (poblacionId: string) => {
  try {
    const res = await api.get(`/evaluados/nivelAlerta/${poblacionId}`);
    return res.data;
  } catch (error) {
    console.error('Error al obtener nivel de alerta:', error);
    throw error;
  }
};

// PARA CREAR EVALUADO
export const createEvaluado = async (evaluado: Partial<Evaluado>) => {
  try {
    const res = await api.post(`/evaluados/crearevaluado`, evaluado);
    return res.data;
  } catch (error) {
    console.error("Error al crear evaluado:", error);
    throw error;
  }
};

// PARA OBTENER EVALUADO POR ID (VER DETALLES)
export const getEvaluadoById = async (id: number) => {
  try {
    const res = await api.get(`evaluados/getevaluado/${id}`);
    return res.data.payload;
  } catch (error) {
    console.error("Error al obtener evaluado:", error);
    throw error;
  }
};

// PARA EDITAR EVALUADO
export const updateEvaluado = async (id: number, evaluadoData: Partial<Evaluado>) => {
  try {
    const res = await api.patch(`/evaluados/updateevaluado/${id}`, evaluadoData);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar evaluado:", error);
    throw error;
  }
};