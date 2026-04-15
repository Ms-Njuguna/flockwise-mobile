import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function FeedScreen() {
  const [birds, setBirds] = useState("");
  const [group, setGroup] = useState("");
  const [result, setResult] = useState(null);

  const getFeedPerBird = () => {
    if (group === "chicks") return 0.065;
    if (group === "growers") return 0.085;
    if (group === "layers") return 0.115;
    return 0;
  };

  const calculateFeed = () => {
    const num = parseInt(birds);
    const feedPerBird = getFeedPerBird();
    const total = num * feedPerBird;

    setResult(total.toFixed(2));
  };

  return (
    <View className="flex-1 p-4 bg-green-50">

      <Text className="text-xl font-bold mb-4">
        Feed Calculator
      </Text>

      {/* SELECT GROUP */}
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          onPress={() => setGroup("chicks")}
          className={`p-3 rounded-lg ${group === "chicks" ? "bg-green-600" : "bg-white"}`}
        >
          <Text className={group === "chicks" ? "text-white" : ""}>
            🐥 Chicks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGroup("growers")}
          className={`p-3 rounded-lg ${group === "growers" ? "bg-green-600" : "bg-white"}`}
        >
          <Text className={group === "growers" ? "text-white" : ""}>
            🐔 Growers
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setGroup("layers")}
          className={`p-3 rounded-lg ${group === "layers" ? "bg-green-600" : "bg-white"}`}
        >
          <Text className={group === "layers" ? "text-white" : ""}>
            🥚 Layers
          </Text>
        </TouchableOpacity>
      </View>

      {/* INPUT */}
      <TextInput
        placeholder="Enter number of birds"
        value={birds}
        onChangeText={setBirds}
        keyboardType="numeric"
        className="bg-white p-3 rounded-lg mb-4"
      />

      {/* BUTTON */}
      <Text
        onPress={calculateFeed}
        className="bg-green-600 text-white p-3 text-center rounded-lg"
      >
        Calculate Feed
      </Text>

      {/* RESULT */}
      {result && (
        <View className="mt-4 bg-white p-4 rounded-xl">
          <Text className="text-lg font-bold">
            Feed needed: {result} kg/day
          </Text>
        </View>
      )}

    </View>
  );
}