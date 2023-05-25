import Cidade from "./cidade";
import Estado from "./estado";
import Rota from "./rota";

/* eslint-disable semi */
export default interface Usuario {
    uid: string;
    email: string;
    image: string;
    telefone: string;
    resideCidade: Cidade;
    resideEstado: Estado;
    onibus?: boolean;
    rota: Rota;
}