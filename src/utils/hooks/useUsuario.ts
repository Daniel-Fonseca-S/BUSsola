import { useRecoilValue } from "recoil";
import { usuarioState } from "../atom";

export default function useUsuario() {
	return useRecoilValue(usuarioState);
}