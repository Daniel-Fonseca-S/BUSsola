import { ActivityIndicator, View } from "react-native";

interface LoadingProps {
	carregando: boolean;
}

export default function Loading(props: LoadingProps) {

	return (
		<View
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				marginTop: -25,
				marginLeft: -25,
				opacity: props ? 1 : 0
			}}
		>
			<ActivityIndicator size={50} animating={props.carregando} color={"#8D28FF"} />
		</View>
	);
}