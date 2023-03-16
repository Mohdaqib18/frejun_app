import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SearchScreen from "./src/screens/SearchScreen";
import FetchScreen from "./src/screens/FetchScreen";
import OptionalScreen from "./src/screens/OptionalScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons"; 


const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar style="dark" />
			<Provider store={store}>
				<NavigationContainer>
					<Tab.Navigator
						initialRouteName="FetchScreen"
						screenOptions={{
							tabBarActiveTintColor: "green",
							headerTintColor: "white",
							headerStyle: { backgroundColor: "green" },
							
						}}
					>
						<Tab.Screen
							name="Fetch Screen"
							component={FetchScreen}
							options={{
								tabBarLabel: "Fetch",
								tabBarIcon: ({ color, size }) => (
									<FontAwesome name="cloud-download" size={24} color={color} />
								),
							}}
						/>
						<Tab.Screen
							name="Search Screen"
							component={SearchScreen}
							options={{
								tabBarLabel: "Search",
								tabBarIcon: ({ color, size }) => (
									<FontAwesome name="search" size={24} color={color} />
								),
							}}
						/>
						<Tab.Screen
							name="Optional Screen"
							component={OptionalScreen}
							options={{
								tabBarLabel: "Optional",
								tabBarIcon: ({ color, size }) => (
									<Ionicons name="options-outline" size={24} color={color} />
								),
							}}
						/>
					</Tab.Navigator>
				</NavigationContainer>
			</Provider>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
});
