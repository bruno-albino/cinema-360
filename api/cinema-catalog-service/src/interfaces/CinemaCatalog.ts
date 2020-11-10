import { ObjectId } from "mongodb";
import { ICinema } from "./Cinema";

export interface ICinemaCatalog {
    _id: string | null;
    cidade: string;
    uf: string;
    pais?: string;
    cinemas: ICinema[]
}