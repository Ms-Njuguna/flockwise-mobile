import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function FeedScreen() {
  const [birds, setBirds] = useState("");
  const [group, setGroup] = useState("");
  const [costPerKg, setCostPerKg] = useState("");
  const [result, setResult] = useState(null);

  const getFeedPerBird = () => {
    if (group === "chicks") return 0.065;
    if (group === "growers") return 0.085;
    if (group === "layers") return 0.115;
    return 0;
  };

  const calculateFeed = () => {
    const num = parseInt(birds);
    const cost = parseFloat(costPerKg);

    if (!num || !cost || !group) return;

    const feedPerBird = getFeedPerBird();
    const totalFeed = num * feedPerBird;
    const totalCost = totalFeed * cost;
    const costPerBird = totalCost / num;

    let warning = "";

    if (group === "layers" && costPerBird > 10) {
      warning = "⚠️ Feed cost too high per bird — may reduce profit";
    }

    setResult({
      totalFeed: totalFeed.toFixed(2),
      totalCost: totalCost.toFixed(0),
      costPerBird: costPerBird.toFixed(2),
      warning,
    });
  };

  return (
    <View className="flex-1 p-4 bg-green-50">

      <Text className="text-xl font-bold mb-4">
        Feed Calculator
      </Text>

      {/* GROUP SELECT */}
      <View className="flex-row justify-between mb-4">
        {["chicks", "growers", "layers"].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setGroup(type)}
            className={`p-3 rounded-lg ${
              group === type ? "bg-green-600" : "bg-white"
            }`}
          >
            <Text className={group === type ? "text-white" : ""}>
              {type === "chicks" && "🐥 Chicks"}
              {type === "growers" && "🐔 Growers"}
              {type === "layers" && "🥚 Layers"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* INPUTS */}
      <TextInput
        placeholder="Number of birds"
        value={birds}
        onChangeText={setBirds}
        keyboardType="numeric"
        className="bg-white p-3 rounded-lg mb-3"
      />

      <TextInput
        placeholder="Feed cost per kg (KES)"
        value={costPerKg}
        onChangeText={setCostPerKg}
        keyboardType="numeric"
        className="bg-white p-3 rounded-lg mb-4"
      />

      {/* BUTTON */}
      <Text
        onPress={calculateFeed}
        className="bg-green-600 text-white p-3 text-center rounded-lg"
      >
        Calculate
      </Text>

      {/* RESULTS */}
      {result && (
        <View className="mt-4 bg-white p-4 rounded-xl">

          <Text>Feed needed: {result.totalFeed} kg/day</Text>
          <Text>Total cost: KES {result.totalCost}</Text>
          <Text>Cost per bird: KES {result.costPerBird}</Text>

          {result.warning !== "" && (
            <Text className="text-red-500 mt-2">
              {result.warning}
            </Text>
          )}

        </View>
      )}

    </View>
  );
}