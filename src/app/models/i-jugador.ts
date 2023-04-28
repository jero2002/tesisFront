import { Estadoj } from "./i-estadoj"
import { Genero } from "./i-generoj"
import { Posicion } from "./i-posicion"
import { Provincia } from "./i-provincia"

export interface Jugador{
    nombre: String,
    celular: number,
    edad: number,
    descripcion: string,
    idPosicion: number,
    idEstadoJ: number,
    idProvincia: number,
    idGenero: number
}

export interface DTOJugador{
    idJugador:number,
    nombre: String,
    celular: number,
    edad: number,
    descripcion: string,
    idPosicion: number,
    idEstadoJ: number,
    idProvincia: number,
    idGenero: number
}

export interface DTOJugadorByGenero{
    idJugador:number,
    nombre: String,
    celular: number,
    edad: number,
    descripcion: string,
    idPosicion: number,
    idEstadoJ: number,
    idProvincia: number,
    idGenero: number,
    idEstadoJNavigation: Estadoj,
    idGeneroNavigation:Genero,
    idPosicionNavigation: Posicion,
    idProvinciaNavigation: Provincia
}

export interface DTOJugadoresEquipo{
    idEquipoJugador: number,
    nombre: String,
    celular: number,
    edad: number,
    posicion: string
}