import { View, Text } from "react-native";
import {useState, useContext, useEffect } from "react";
import { fetchRecords } from "../api/records";
import { FarmContext } from "../context/FarmContext";

export default function DashboardScreen() {
  const { flock, records } = useContext(FarmContext);

  const [apiRecords, setApiRecords] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchRecords();
      setApiRecords(data);
    };

    loadData();
  }, []);

  const totalEggs = apiRecords.reduce((sum, r) => sum + r.eggs, 0);
  const totalProfit = apiRecords.reduce((sum, r) => sum + r.profit, 0);

  const today = apiRecords[apiRecords.length - 1] || {
    eggs: 0,
    profit: 0,
  };

  return (
    <View className="flex-1 bg-green-50 p-4">

      <Text className="text-2xl font-bold mb-4">
        🐔 FlockWise
      </Text>

      {/* TODAY PROFIT */}
      <View className="bg-white p-4 rounded-xl mb-4">
        <Text className="text-gray-500">Today's Profit</Text>
        <Text className="text-2xl font-bold text-green-600">
          KES {today.profit}
        </Text>
      </View>

      {/* STATS */}
      <View className="flex-row justify-between">

        <View className="bg-white p-4 rounded-xl w-[30%]">
          <Text>🥚 Eggs</Text>
          <Text className="font-bold">{today.eggs}</Text>
        </View>

        <View className="bg-white p-4 rounded-xl w-[30%]">
          <Text>💰 Total Profit</Text>
          <Text className="font-bold">KES {totalProfit}</Text>
        </View>

        <View className="bg-white p-4 rounded-xl w-[30%]">
          <Text>🐔 Layers</Text>
          <Text className="font-bold">{flock.layers}</Text>
        </View>

      </View>

    </View>
  );
}