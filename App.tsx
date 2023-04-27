import React from "react";
import Rota from "src/views/main";
import Login from "src/views/login";
import Cadastro from "src/views/cadastro";
import NovaSenha from "src/views/nova-senha";
import RecuperarSenha from "src/views/recuperar-senha";
import { SafeAreaView, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import SelecionarRota from "src/views/select-rota";

export const navigationRef = createNavigationContainerRef();

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<SafeAreaView style={styles.container}>
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator>
					<Stack.Screen name="Log Out" component={Login} options={{ headerShown: false }} />
					<Stack.Screen name="Nova Senha" component={NovaSenha} options={{ headerShown: false }} />
					<Stack.Screen name="Recuperar Senha" component={RecuperarSenha} options={{ headerShown: false }} />
					<Stack.Screen name="Home" component={Rota} options={{ headerShown: false }} />
					<Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
					<Stack.Screen name="Selecionar Rota" component={SelecionarRota} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
