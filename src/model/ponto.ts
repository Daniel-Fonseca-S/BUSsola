/* eslint-disable semi */
export default interface Ponto {
    uid: string;
    latitude: number;
    longitude: number;
    descricao: string;
    rua: string;
    bairro: string;
    observacao: string;
    imagem?: string;
}