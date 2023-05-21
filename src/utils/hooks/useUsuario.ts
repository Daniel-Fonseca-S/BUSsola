import { useRecoilState } from "recoil";
import { usuarioState } from "../atoms/usuario-atom";

export const useUsuario = () => {
	const [usuario] = useRecoilState(usuarioState);
	return usuario;
};