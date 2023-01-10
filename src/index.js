import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Recover from "./Login/Recover";

const Stack = createNativeStackNavigator();
export default RootComponent = function () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Register"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Recover" component={Recover} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
