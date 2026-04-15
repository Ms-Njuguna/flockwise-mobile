import { View, Text } from "react-native";

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-green-50 p-4">

      <Text className="text-2xl font-bold mb-4">
        🐔 FlockWise
      </Text>

      <View className="bg-white p-4 rounded-xl shadow mb-4">
        <Text className="text-gray-500">Today's Profit</Text>
        <Text className="text-2xl font-bold text-green-600">
          KES 120
        </Text>
      </View>

      <View className="flex-row justify-between">
        <View className="bg-white p-4 rounded-xl w-[30%]">
          <Text>🥚 Eggs</Text>
          <Text className="font-bold">12</Text>
        </View>

        <View className="bg-white p-4 rounded-xl w-[30%]">
          <Text>🍽️ Feed</Text>
          <Text className="font-bold">7kg</Text>
        </View>

        <View className="bg-white p-4 rounded-xl w-[30%]">
          <Text>🐔 Layers</Text>
          <Text className="font-bold">17</Text>
        </View>
      </View>

    </View>
  );
}