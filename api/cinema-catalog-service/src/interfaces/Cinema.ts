export interface ICinema {
    _id: string;
    nome: string;
    salas: IRoom[];
}

interface IRoom {
    nome: number;
    sessoes: ISessions[];
}

export interface IMovie {
    filme: string;
    idFilme: string;
}

export interface IMovieSession {
    filme: string;
    idFilme: string;
    idCinema?: string;
    sala: string;
    sessao: ISessions[]

}
export interface ISessions {
    data: Date;
    idFilme: string;
    filme: string;
    valor: number;
    assentos: ISeats[];
}
interface ISeats {
    numero: number;
    disponivel: boolean;
}