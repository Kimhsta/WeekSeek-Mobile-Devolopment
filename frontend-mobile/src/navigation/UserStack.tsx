// src/navigations/UserStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/user/DetailScreen';
import UserTabs from './UserTabs'; // ← pakai tab navigator

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={UserTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detail Film' }}
      />
    </Stack.Navigator>
  );
}
