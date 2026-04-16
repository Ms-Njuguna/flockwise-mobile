import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import {
  fetchEggs,
  fetchBirdSales,
  fetchExpenses,
} from "../api/dashboard";

export default function DashboardScreen() {
  const [profit, setProfit] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const eggs = await fetchEggs();
      const birds = await fetchBirdSales();
      const exp = await fetchExpenses();

      // 🥚 Egg income
      const eggIncome = eggs.reduce(
        (sum, e) => sum + e.sold * e.price_per_egg,
        0
      );

      // 🐔 Bird income
      const birdIncome = birds.reduce(
        (sum, b) => sum + b.number_sold * b.price_per_bird,
        0
      );

      const totalIncome = eggIncome + birdIncome;

      // 💸 Expenses
      const totalExpenses = exp.reduce(
        (sum, e) => sum + e.amount,
        0
      );

      setIncome(totalIncome);
      setExpenses(totalExpenses);
      setProfit(totalIncome - totalExpenses);
    };

    loadData();
  }, []);

  return (
    <View className="flex-1 bg-green-50 p-4">

      <Text className="text-2xl font-bold mb-4">
        📊 Farm Dashboard
      </Text>

      <View className="bg-white p-4 rounded-xl mb-4">
        <Text>Total Income</Text>
        <Text className="text-green-600 font-bold text-xl">
          KES {income}
        </Text>
      </View>

      <View className="bg-white p-4 rounded-xl mb-4">
        <Text>Total Expenses</Text>
        <Text className="text-red-500 font-bold text-xl">
          KES {expenses}
        </Text>
      </View>

      <View className="bg-white p-4 rounded-xl">
        <Text>Net Profit</Text>
        <Text
          className={`font-bold text-xl ${
            profit >= 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          KES {profit}
        </Text>
      </View>

    </View>
  );
}