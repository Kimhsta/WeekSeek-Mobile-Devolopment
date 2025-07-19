import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/user/HomeScreen';
import SearchScreen from '../screens/user/SearchScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import { Home, Search, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') return <Home color={color} size={size} />;
          if (route.name === 'Search') return <Search color={color} size={size} />;
          if (route.name === 'Profile') return <User color={color} size={size} />;
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
