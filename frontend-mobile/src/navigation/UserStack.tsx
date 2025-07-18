import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/user/HomeScreen';
// import DetailScreen from '../screens/user/DetailScreen';
// import SearchScreen from '../screens/user/SearchScreen';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Search" component={SearchScreen} /> */}
    </Stack.Navigator>
  );
}
