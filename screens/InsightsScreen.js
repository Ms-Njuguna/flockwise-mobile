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

  useEffect(() => {
    const load = async () => {
      const eggs = await fetchEggs();
      const birds = await fetchBirdSales();
      const expenses = await fetchExpenses();
      const flock = await fetchFlock();

      const result = generateInsights(eggs, birds, expenses, flock);
      setInsights(result);
    };

    load();
  }, []);

  return (
    <ScrollView className="flex-1 p-4 bg-green-50">

      <Text className="text-2xl font-bold mb-4">
        🧠 Smart Insights
      </Text>

      {insights.map((item, index) => (
        <View key={index} className="bg-white p-4 rounded-xl mb-3">
          <Text>{item}</Text>
        </View>
      ))}

    </ScrollView>
  );
}