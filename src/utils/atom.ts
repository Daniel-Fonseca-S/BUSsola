import { atom } from "recoil";
import Usuario from "src/model/usuario";

export const usuarioState = atom({
	key: "usuarioState",
	default: {
		uid: "",
		email: "",
		imagem: "",
		telefone: ""
	} as Usuario
});