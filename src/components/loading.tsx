// eslint-disable-next-line @typescript-eslint/no-var-requires
const amongo = require("../assets/icons/amongo.png");
import { Animated, Easing, View } from "react-native";

interface LoadingProps { carregando: boolean; }

export default function Loading(props: LoadingProps) {

	const spinValue = new Animated.Value(0);

	Animated.timing(
		spinValue,
		{
			toValue: 1,
			duration: 3000,
			easing: Easing.linear,
			useNativeDriver: true
		}
	).start();

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"]
	});

	Animated.loop(
		Animated.timing(
			spinValue,
			{
				toValue: 1,
				duration: 3000,
				easing: Easing.linear,
				useNativeDriver: true
			}
		)
	).start();

	return (
		<View
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				marginTop: -25,
				marginLeft: -25,
				opacity: props.carregando ? 1 : 0
			}}
		>
			<Animated.Image
				style={{
					transform: [{ rotate: spin }],
					width: 50,
					height: 50,
					resizeMode: "contain"
				}}
				source={amongo}
			/>
		</View>
	);
}