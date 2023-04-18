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