import { View, Text, TextInput } from "react-native";
import { useState } from "react";

export default function FeedScreen() {
  const [birds, setBirds] = useState("");
  const [result, setResult] = useState(null);

  const calculateFeed = () => {
    const num = parseInt(birds);
    const total = num * 0.11; // 110g layers
    setResult(total.toFixed(2));
  };

  return (
    <View className="flex-1 p-4 bg-green-50">

      <Text className="text-xl font-bold mb-4">
        Feed Calculator
      </Text>

      <TextInput
        placeholder="Enter number of birds"
        value={birds}
        onChangeText={setBirds}
        keyboardType="numeric"
        className="bg-white p-3 rounded-lg mb-4"
      />

      <Text
        onPress={calculateFeed}
        className="bg-green-600 text-white p-3 text-center rounded-lg"
      >
        Calculate
      </Text>

      {result && (
        <Text className="mt-4 text-lg">
          Feed needed: {result} kg/day
        </Text>
      )}

    </View>
  );
}