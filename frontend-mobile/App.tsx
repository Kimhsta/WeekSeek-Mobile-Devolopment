import "./global.css"; // ini WAJIB
import { View, Text } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-cyan-400">
      <Text className="text-xl font-bold text-blue-800">
        Hello NativeWind!
      </Text>
    </View>
  );
}
