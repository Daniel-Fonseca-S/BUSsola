import Cidade from "./cidade";
import Estado from "./estado";
import Rota from "./rota";

/* eslint-disable semi */
export default interface Usuario {
    uid: string;
    email: string;
    imagem: string;
    telefone: string;
    resideCidade: Cidade;
    resideEstado: Estado;
    rota: Rota
}