import { ObjectId } from "mongodb"

export interface IMovies {
    _id: string | null;
    titulo: string;
    sinpose: string;
    duracao: number;
    dataLancamento: Date;
    imagem: string;
    categories: Array<string>;
}