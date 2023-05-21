import { atom } from "recoil";
import Usuario from "src/model/usuario";

export const usuarioState = atom({
	key: "usuarioState",
	default: {
		id: "",
		email: "",
		imagem: "",
		senha: "",
		telefone: ""
	} as Usuario
});