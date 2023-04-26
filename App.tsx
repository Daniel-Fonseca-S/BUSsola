import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Menu from "./src/components/menu";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "src/views/login";
import RecuperarSenha from "src/views/recuperar-senha";

export default function App() {
	const Drawer = createDrawerNavigator();

	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="recuperar-senha">
				<Drawer.Screen name="Menu" component={Menu} />
				<Drawer.Screen name="login" component={Login} />
				<Drawer.Screen name="recuperar-senha" component={RecuperarSenha} />
			</Drawer.Navigator>
			{/* <Stack.Navigator initialRouteName='Menu'>
				<Stack.Screen name="Menu" component={Menu} options={{ headerShown: false, statusBarHidden: true }} />
				<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
			</Stack.Navigator> */}
		</NavigationContainer>
	);
}