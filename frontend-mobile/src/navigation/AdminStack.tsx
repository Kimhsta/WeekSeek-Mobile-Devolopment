// src/navigation/AdminStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/admin/DashboardScreen';
import FilmListScreen from '../screens/admin/FilmListScreen';
import AccountScreen from '../screens/admin/AccountScreen';
// import EditFilmScreen from '../screens/admin/EditFilmScreen';
// import DetailFilmScreen from '../screens/admin/DetailFilmScreen';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="FilmList" component={FilmListScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      {/* <Stack.Screen name="EditFilm" component={EditFilmScreen} />
      <Stack.Screen name="DetailFilm" component={DetailFilmScreen} /> */}
    </Stack.Navigator>
  );
}
