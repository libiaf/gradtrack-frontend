declare module "my-types" {
  export interface Evaluado {
    id: number;
    nombre: string;
    apellidos: string;
    curp: string;
    genero: string;
    graduado: string;
    poblacionId: number;
  }

  export interface Zona {
    id: number;
    nombre: string;
    estado: string;
  }

  export interface Poblacion {
    id: number;
    edad: number;
    nivelSocioeconomico: string;
    zonaId: number;
  }
}
