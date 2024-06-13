import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";

import HomeScreen from "../../screens/HomeScreen";
import LabelsScreen from "../../screens/LabelsScreen";
import TrashScreen from "../../screens/TrashScreen";
import FoldersScreen from "../../screens/FoldersScreen";

import EditNoteScreen from "../../screens/EditNoteScreen";
import NewNoteScreen from "../../screens/NewNoteScreen";
import ManageLabelsScreen from "../../screens/ManageLabelsScreen";
import FolderNotesScreen from "../../screens/FolderNotesScreen";

import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawerNavigator() {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen options={{drawerIcon: ({ size, color}) => (<Ionicons name="home" size={size} color={color} />)}}
            name="Home" component={HomeScreen} />
        <Drawer.Screen options={{drawerIcon: ({ size, color}) => (<Ionicons name="pricetag" size={size} color={color} />)}}
            name="Labels" component={LabelsScreen} />
        <Drawer.Screen options={{drawerIcon: ({ size, color}) => (<Ionicons name="folder" size={size} color={color} />)}}
            name="Folders" component={FoldersScreen} />
        <Drawer.Screen options={{drawerIcon: ({ size, color}) => (<Ionicons name="trash" size={size} color={color} />)}}
            name="Trash" component={TrashScreen} />
      </Drawer.Navigator>
    );
  }
  
  function RootNavigator() {
    return (
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainDrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NewNote" component={NewNoteScreen} />
        <Stack.Screen name="EditNote" component={EditNoteScreen} />
        <Stack.Screen name="ManageLabels" component={ManageLabelsScreen} />
        <Stack.Screen name="FolderNotes" component={FolderNotesScreen} />
      </Stack.Navigator>
    );
  }
  
  export default function AppNavigator() {
    return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );
}