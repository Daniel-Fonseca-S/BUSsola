import { useSetRecoilState } from "recoil";
import { usuarioState } from "../atom";

export default function useSetUsuario() {
	return useSetRecoilState(usuarioState);
}