import React from "react"; 
import { Image, View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import ToDoScreen from "../screens/ToDoScreen";
import BMIScreen from "../screens/BMIScreen";
import QuoteScreen from "../screens/QuoteScreen";
import HeightConverterScreen from "../screens/HeightConverterScreen";
import MovieSuggestionScreen from "../screens/MovieSuggestionScreen";
import BudgetTrackerScreen from "../screens/BudgetTrackerScreen";
import WordUnscrambleScreen from "../screens/WordUnscrambleScreen";
import QuickMathScreen from "../screens/QuickMathScreen";
// import SnakeGameScreen from '../screens/SnakeGameScreen';
import TilePuzzleScreen from "../screens/TilePuzzleScreen";
import NumberGuesserScreen from "../screens/NumberGuesserScreen";
import TypingSpeedScreen from "../screens/TypingSpeedScreen";


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "#007bff",
        drawerLabelStyle: { fontSize: 16 },
        headerRight: () => (
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        ),
      }}
    >
      <Drawer.Screen
        name="To-Do List"
        component={ToDoScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="BMI Calculator"
        component={BMIScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Height Converter"
        component={HeightConverterScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="swap-vertical-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Quotes"
        component={QuoteScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Movie Suggestion"
        component={MovieSuggestionScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Budget Tracker"
        component={BudgetTrackerScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Typing Speed Test"
        component={TypingSpeedScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="speedometer-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Word Unscramble"
        component={WordUnscrambleScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="shuffle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Quick Math"
        component={QuickMathScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calculator-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Snake Game"
        component={SnakeGameScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="game-controller-outline"
              size={size}
              color={color}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Tile Puzzle"
        component={TilePuzzleScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Number Guesser"
        component={NumberGuesserScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="game-controller-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    marginRight: 16,
  },
  logo: {
    width: 32,
    height: 32,
  },
});
