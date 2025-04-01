import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import ImageCaptureScreen from '../screens/ImageCaptureScreen';
import ResultsScreen from '../screens/ResultsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import AlertsScreen from '../screens/AlertsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Initialize navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* Tab Navigator (optional, depending on your app structure) */}
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: { backgroundColor: '#f2f2f2' },
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: () => <Image source={require('../assets/logo.png')} style={{ width: 20, height: 20 }} />,
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: () => <Image source={require('../assets/chicken_image.png')} style={{ width: 20, height: 20 }} />,
          }}
        />
        <Tab.Screen
          name="Alerts"
          component={AlertsScreen}
          options={{
            tabBarIcon: () => <Image source={require('../assets/alert_icon.png')} style={{ width: 20, height: 20 }} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Stack Navigator for Home, ImageCapture, and Results screens
const HomeStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen
        name="ImageCapture"
        component={ImageCaptureScreen}
        options={{ title: 'Capture Image' }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ title: 'Results' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;