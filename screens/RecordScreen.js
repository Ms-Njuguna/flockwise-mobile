import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { useContext } from "react";
import { FarmContext } from "../context/FarmContext";

export default function RecordScreen() {
  const [eggs, setEggs] = useState("");
  const [price, setPrice] = useState("");
  const [feedCost, setFeedCost] = useState("");
  const [result, setResult] = useState(null);
  const { records, setRecords } = useContext(FarmContext);

  const generateInsights = (numEggs, cost, income, profit) => {
    let insights = [];
    const costPerEgg = numEggs > 0 ? cost / numEggs : 0;

    if (profit < 0) insights.push("❌ You are making a loss today");
    if (costPerEgg > 20) insights.push("⚠️ Feed cost per egg is too high");
    if (numEggs < 10) insights.push("🐔 Egg production is low — check lighting & feed");
    
    return insights;
  };

  const calculateProfit = () => {
    const totalEggs = parseInt(eggs);
    const eggPrice = parseFloat(price);
    const cost = parseFloat(feedCost);

    if (isNaN(totalEggs) || isNaN(eggPrice) || isNaN(cost)) {
        alert("Please enter valid numbers in all fields");
        return;
    }

    const income = totalEggs * eggPrice;
    const profit = income - cost;
    const insights = generateInsights(totalEggs, cost, income, profit);

    let status = profit < 0 ? "❌ Loss" : profit === 0 ? "⚖️ Break-even" : "✅ Profit";

    setRecords([
      ...records,
      {
        eggs: totalEggs,
        income,
        profit,
      },
    ]);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView className="flex-1 p-4 bg-green-50">
        <Text className="text-2xl font-bold mb-6 mt-4 text-green-900">
          Daily Profit Calculator
        </Text>

        <View className="space-y-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">Eggs Collected</Text>
          <TextInput
            placeholder="e.g. 24"
            value={eggs}
            onChangeText={setEggs}
            keyboardType="numeric"
            className="bg-white p-4 rounded-xl mb-4 border border-gray-200"
          />

          <Text className="text-sm font-medium text-gray-700 mb-1">Price per Egg (KES)</Text>
          <TextInput
            placeholder="e.g. 15"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            className="bg-white p-4 rounded-xl mb-4 border border-gray-200"
          />

          <Text className="text-sm font-medium text-gray-700 mb-1">Total Feed Cost (KES)</Text>
          <TextInput
            placeholder="e.g. 200"
            value={feedCost}
            onChangeText={setFeedCost}
            keyboardType="numeric"
            className="bg-white p-4 rounded-xl mb-6 border border-gray-200"
          />
        </View>

        <TouchableOpacity 
          onPress={calculateProfit}
          activeOpacity={0.8}
          className="bg-green-600 p-4 rounded-xl shadow-md"
        >
          <Text className="text-white text-center font-bold text-lg">
            Calculate Today's Profit
          </Text>
        </TouchableOpacity>

        {result && (
          <View className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-green-100">
            <Text className="text-gray-500 uppercase text-xs font-bold tracking-widest">Results</Text>
            
            <View className="flex-row justify-between items-center mt-2">
                <Text className="text-lg text-gray-700">Income:</Text>
                <Text className="text-lg font-semibold">KES {result.income}</Text>
            </View>

            <View className="flex-row justify-between items-center mt-1">
                <Text className="text-lg text-gray-700">Net Profit:</Text>
                <Text className={`text-xl font-bold ${parseFloat(result.profit) < 0 ? 'text-red-500' : 'text-green-600'}`}>
                    KES {result.profit}
                </Text>
            </View>

            <Text className="mt-4 p-2 bg-gray-50 text-center rounded-lg font-bold">
              {result.status}
            </Text>

            {/* INSIGHTS SECTION */}
            {result.insights?.length > 0 && (
              <View className="mt-4 border-t border-gray-100 pt-4">
                <Text className="text-sm font-bold text-gray-800 mb-2">Smart Insights:</Text>
                {result.insights.map((tip, index) => (
                  <Text key={index} className="text-sm text-gray-600 mb-2 bg-yellow-50 p-2 rounded">
                    {tip}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
        <View className="h-20" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}