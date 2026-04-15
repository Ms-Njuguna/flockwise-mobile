import { View, Text, TextInput } from "react-native";
import { useState } from "react";

export default function RecordScreen() {
  const [eggs, setEggs] = useState("");
  const [price, setPrice] = useState("");
  const [feedCost, setFeedCost] = useState("");
  const [result, setResult] = useState(null);

  const calculateProfit = () => {
    const totalEggs = parseInt(eggs);
    const eggPrice = parseFloat(price);
    const cost = parseFloat(feedCost);

    if (!totalEggs || !eggPrice || !cost) return;

    const income = totalEggs * eggPrice;
    const profit = income - cost;

    let status = "";
    if (profit < 0) status = "❌ Loss";
    else if (profit === 0) status = "⚖️ Break-even";
    else status = "✅ Profit";

    setResult({
      income: income.toFixed(0),
      profit: profit.toFixed(0),
      status,
    });
  };

  return (
    <View className="flex-1 p-4 bg-green-50">

      <Text className="text-xl font-bold mb-4">
        Daily Profit Calculator
      </Text>

      <TextInput
        placeholder="Eggs collected"
        value={eggs}
        onChangeText={setEggs}
        keyboardType="numeric"
        className="bg-white p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Price per egg (KES)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        className="bg-white p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Total feed cost today (KES)"
        value={feedCost}
        onChangeText={setFeedCost}
        keyboardType="numeric"
        className="bg-white p-3 rounded-lg mb-4"
      />

      <Text
        onPress={calculateProfit}
        className="bg-green-600 text-white p-3 text-center rounded-lg"
      >
        Calculate Profit
      </Text>

      {result && (
        <View className="mt-4 bg-white p-4 rounded-xl">

          <Text>Income: KES {result.income}</Text>
          <Text>Profit: KES {result.profit}</Text>

          <Text className="mt-2 font-bold">
            {result.status}
          </Text>

        </View>
      )}

    </View>
  );
}