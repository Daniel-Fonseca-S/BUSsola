import { Button, Stack, Text } from "@react-native-material/core";
import React from "react";
import { StyleSheet, View } from "react-native";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SelecionarRota(vai: any) {

	return (
		<View
			style={styles.rota}>
			<Stack
				style={styles.tackstack}>
				<View
					style={styles.linha}>
					<Text
						style={styles.lbl}>
                        Rota UTFPR
					</Text>
					<Button
						title={"IR"}
						color={"#8D28FF"}
						style={styles.butn}
						onPress={() => { vai.navigate("rota-1"); }}
					/>
				</View>

				<View
					style={styles.linha}>
					<Text
						style={styles.lbl}>
                        Rota Entre Bairros 1
					</Text>
					<Button
						title={"IR"}
						color={"#8D28FF"}
						style={styles.butn}
						onPress={() => { vai.navigate("rota-2"); }}
					/>
				</View>

				<View
					style={styles.linha}>
					<Text
						style={styles.lbl}>
                        Rota Entre Bairros 2
					</Text>
					<Button
						title={"IR"}
						color={"#8D28FF"}
						style={styles.butn}
						onPress={() => { vai.navigate("rota-3"); }}
					/>
				</View>

			</Stack>
		</View>
	);


}

const styles = StyleSheet.create({
	rota: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#000",
		padding: 10,
	},
	tackstack: {
		width: "95%",
	},
	linha: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
	},
	lbl: {
		color: "#B7B7B7",
	},
	butn: {
		width: "22.5%",
	}
});