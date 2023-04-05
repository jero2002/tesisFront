export interface Login{
    idUsuario:number;
    email: string;
    contrasenia: string;
    nombre: string;
    rol: number; //Este en realidad tiene que ser number
    idJugador:number; 
    idEquipo:number;
    token: string;
    message: string;
    ok: boolean;
    error: string
    codigoEstado: number;
}