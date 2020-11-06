import { ObjectId } from "mongodb"

export interface IMovies {
    _id: ObjectId | null;
    titulo: string;
    sinpose: string;
    duracao: number;
    dataLancamento: Date;
    imagem: string;
    categories: Array<string>;
}