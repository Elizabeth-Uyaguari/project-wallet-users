import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { DetailScreen } from "../screens/DetailScreen";

export type RootStackParamlist = {
    Home: undefined;
    Detail: { userId: string }
};

const Stack = createStackNavigator<RootStackParamlist>();

export const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F3F4F6',
                },
                headerTintColor: '#111827',
                headerTitleStyle: {
                    fontWeight: '700',
                    fontSize: 18,
                }
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Wallet Users'
                }}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{
                    title: 'Perfil del Usuario'
                }}
            />
        </Stack.Navigator>

    );
}