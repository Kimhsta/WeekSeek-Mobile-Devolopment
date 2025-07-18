import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/admin/DashboardScreen';
// import AddFilmScreen from '../screens/admin/AddFilmScreen';
// import EditFilmScreen from '../screens/admin/EditFilmScreen';
// import FilmListScreen from '../screens/admin/FilmListScreen';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      {/* <Stack.Screen name="AddFilm" component={AddFilmScreen} />
      <Stack.Screen name="EditFilm" component={EditFilmScreen} />
      <Stack.Screen name="FilmList" component={FilmListScreen} /> */}
    </Stack.Navigator>
  );
}
