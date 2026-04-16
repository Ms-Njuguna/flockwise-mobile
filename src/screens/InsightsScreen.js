import { View, Text, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import {
  fetchEggs,
  fetchBirdSales,
  fetchExpenses,
} from "../api/dashboard";
import { fetchFlock } from "../api/flock";
import { generateInsights } from "../utils/insights";

export default function InsightsScreen() {
  const [insights, setInsights] = useState([]);

  const [eggData, setEggData] = useState([]); // 1. Store eggs in state

  useEffect(() => {
    const load = async () => {
      const eggs = await fetchEggs();
      const birds = await fetchBirdSales();
      const expenses = await fetchExpenses();
      const flock = await fetchFlock();

      setEggData(eggs); // 2. Update state
      const result = generateInsights(eggs, birds, expenses, flock);
      setInsights(result);
    };

    load();
  }, []);

  // 3. Calculate from state (with a safety check for empty arrays)
  const weeklyEggs = eggData.slice(-7).reduce((sum, e) => sum + (e.eggs_collected || 0), 0);
  const monthlyEggs = eggData.slice(-30).reduce((sum, e) => sum + (e.eggs_collected || 0), 0);

  return (
    <ScrollView className="flex-1 p-4 bg-green-50">
      <Text className="text-2xl font-bold mb-4">🧠 Smart Insights</Text>

      {/* Display your manual totals */}
      <View className="bg-blue-100 p-4 rounded-xl mb-4">
        <Text className="font-bold">Quick Stats:</Text>
        <Text>Weekly Eggs: {weeklyEggs}</Text>
        <Text>Monthly Eggs: {monthlyEggs}</Text>
      </View>

      {insights.map((item, index) => (
        <View key={index} className="bg-white p-4 rounded-xl mb-3">
          <Text>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}