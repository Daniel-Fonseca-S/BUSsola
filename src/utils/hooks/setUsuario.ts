import { useSetRecoilState } from "recoil";
import { usuarioState } from "../atom";

export default function setUsuario() {
	return useSetRecoilState(usuarioState);
}