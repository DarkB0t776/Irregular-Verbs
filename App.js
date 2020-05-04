// Core
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screens
import VerbsScreen from './src/screens/VerbsScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PracticeAllScreen from './src/screens/PracticeAllScreen';
import PracticeWordScreen from './src/screens/PracticeWordScreen';
import PracticeResultsScreen from './src/screens/PracticeResultsScreen';
import ExamScreen from './src/screens/ExamScreen';
import CardsScreen from './src/screens/CardsScreen';

// Components
import Header from './src/components/headers/Header';
import DrawerMenuList from './src/components/DrawerMenuList';

// Other
import SplashScreen from 'react-native-splash-screen';


const Drawer = createDrawerNavigator();
// const PracticeStack = createStackNavigator();
const MainStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Stack = ({ navigation }) => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Practice"
      component={PracticeScreen}
      options={{ header: () => null }}
    />
    <MainStack.Screen name="PracticeAll" component={PracticeAllScreen} />
    <MainStack.Screen name="PracticeWord" component={PracticeWordScreen} />
    <MainStack.Screen
      name="PracticeResults"
      component={PracticeResultsScreen}
    />
    <MainStack.Screen name="Exam" component={ExamScreen} />
    <MainStack.Screen name="Cards" component={CardsScreen} />
  </MainStack.Navigator>
);

const Main = () => (
  <Tab.Navigator
    initialRouteName="Verbs"
    headerMode="screen"
    tabBar={props => <Header {...props} />}>
    <Tab.Screen name="Verbs" component={VerbsScreen} />
    <Tab.Screen name="Favorite" component={FavoriteScreen} />
    <Tab.Screen name="Practice" component={PracticeScreen} />
  </Tab.Navigator>
);

//Drawer Menu
const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerMenuList {...props} />
    </DrawerContentScrollView>
  );
};

const App = props => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Main"
        drawerStyle={styles.drawerMenu}
        drawerContent={CustomDrawerContent}
        drawerContentOptions={{ inactiveTintColor: 'white' }}>
        <Drawer.Screen
          name="MainPractice"
          component={Stack}
          options={{ gestureEnabled: false }}
        />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Main" component={Main} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E52E2E',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'black',
    height: 100,
    justifyContent: 'flex-end',
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  indicator: {
    backgroundColor: 'white',
    height: 4,
    width: 100,
    alignItems: 'center',
  },
  drawerMenu: {
    backgroundColor: '#3A3030',
    color: 'white',
  },
  drawerLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerIcon: {
    color: 'white',
    fontSize: 35,
    marginRight: 0,
  },
});

export default App;
