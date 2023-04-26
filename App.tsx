import React from "react";
import Login from "src/views/login";
import NovaSenha from "src/views/nova-senha";
import RecuperarSenha from "src/views/recuperar-senha";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
				<Stack.Screen name="Nova Senha" component={NovaSenha} options={{ headerShown: false }} />
				<Stack.Screen name="Recuperar Senha" component={RecuperarSenha} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}