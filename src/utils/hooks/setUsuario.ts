import { useRecoilState } from "recoil";
import { usuarioState } from "../atoms/usuario-atom";

export const setUsuario = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [usuario, setUsuario] = useRecoilState(usuarioState);
	return setUsuario;
};