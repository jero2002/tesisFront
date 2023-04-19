import { Estadoe } from "./i-estadoe"
import { Generoe } from "./i-generoe"
import { Provincia } from "./i-provincia"

export interface Equipo{
    nombre: String,
    celular: number,
    torneoGanado: number,
    entrenador: string,
    idEstadoE: number,
    idGeneroE: number,
    idProvincia: number
}

export interface DTOEquipo{
    idEquipo:number,
    nombre: String,
    celular: number,
    torneoGanado: number,
    entrenador: string,
    idEstadoE: number,
    idGeneroE: number,
    idProvincia: number
}

export interface DTOEquipoByGenero{
    idEquipo:number,
    nombre: String,
    celular: number,
    torneoGanado: number,
    entrenador: string,
    idEstadoE: number,
    idGeneroE: number,
    idProvincia: number,
    idGeneroENavigation:Generoe,
    idEstadoENavigation: Estadoe,
    idProvinciaNavigation: Provincia
}