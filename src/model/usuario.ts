import Cidade from "./cidade";
import Estado from "./estado";

/* eslint-disable semi */
export default interface Usuario {
    uid: string;
    email: string;
    imagem: string;
    telefone: string;
    resideCidade: Cidade;
    resideEstado: Estado;
}