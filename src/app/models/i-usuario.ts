export interface Usuario{
    email: string;
    nombre: string ;
    contrasenia: string;
}

export interface UsuarioDTOUpdate{
    idUsuario:number;
    email: string;
    contrasenia: string;
    nombre: string;
    rol: number; //Este en realidad tiene que ser number
    idJugador:number; 
    idEquipo:number;
    token: string;
    
}

export interface UserLocalStorage {
    idUsuario: number;
    email: string;
    contrasenia: string;
    nombre: string;
    rol: number;
    idJugador: number;
    idEquipo: number;
    token: string;
    message: string;
    ok: boolean;
    error: string
    codigoEstado: number;
  }


