import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Login/Login";
import Recover from "./Login/Recover";
import HomeScreen from "./HomeScreen";
import About from "./About";
import History from "./History/History";
import Tracking from "./Tracking/Tracking";
import Order from "./Order";
import OrderDetail from "./component/OrderDetail";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs({ route }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Thống Kê",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          headerShown: false,
          tabBarLabel: "Đơn Hàng",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Octicons name="package" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tracking"
        component={Tracking}
        options={{
          headerShown: false,
          tabBarLabel: "Tracking",
          tabBarColor: "#694fad",
          tabBarIcon: ({ color }) => (
            <Feather name="map-pin" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
          tabBarLabel: "Lịch Sử",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
          tabBarLabel: "Cá Nhân",
          tabBarColor: "#694fad",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default RootComponent = function () {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Recover" component={Recover} />
        <Stack.Screen
          name="HomeTabs"
          component={MyTabs}
          screenOptions={{ headerShown: false }}
        />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
