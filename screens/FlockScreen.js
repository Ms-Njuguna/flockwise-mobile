import { View, Text, TextInput } from "react-native";
import { useContext, useState } from "react";
import { FarmContext } from "../context/FarmContext";

export default function FlockScreen() {
  const { flock, setFlock } = useContext(FarmContext);

  const [layers, setLayers] = useState("");

  const updateFlock = () => {
    setFlock({
      ...flock,
      layers: parseInt(layers) || 0,
    });
  };

  return (
    <View className="flex-1 p-4 bg-green-50">

      <Text className="text-xl font-bold mb-4">
        Manage Flock
      </Text>

      <TextInput
        placeholder="Number of layers"
        value={layers}
        onChangeText={setLayers}
        keyboardType="numeric"
        className="bg-white p-3 rounded-lg mb-4"
      />

      <Text
        onPress={updateFlock}
        className="bg-green-600 text-white p-3 text-center rounded-lg"
      >
        Save
      </Text>

      <Text className="mt-4">
        Current layers: {flock.layers}
      </Text>

    </View>
  );
}