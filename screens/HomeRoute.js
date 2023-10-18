import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddScreen from "./Hikes/AddScreen";
import SearchScreen from "./Hikes/SearchScreen";
import ListScreen from "./Hikes/ListScreen";

const HomeRoute = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default HomeRoute;
