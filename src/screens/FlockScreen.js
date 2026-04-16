import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { createFlock } from "../api/flock";

const types = ["chicks", "growers", "layers"];

export default function FlockScreen() {
  const [type, setType] = useState("");
  const [count, setCount] = useState("");
  const [males, setMales] = useState("");
  const [age, setAge] = useState("");

  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const num = parseInt(count) || 0;
    const maleNum = parseInt(males) || 0;
    const ageWeeks = parseInt(age) || 0;

    if (!type || num <= 0) {
      alert("Enter valid flock data");
      return;
    }

    try {
      await createFlock({
        type,
        count: num,
        males: maleNum,
        age_weeks: ageWeeks,
      });

      setResult({
        type,
        count: num,
      });

      // reset
      setType("");
      setCount("");
      setMales("");
      setAge("");

    } catch (err) {
      console.log(err);
      alert("Error saving flock");
    }
  };

  return (
    <ScrollView className="flex-1 p-4 bg-green-50">

      <Text className="text-2xl font-bold mb-4">
        🐔 Flock Management
      </Text>

      {/* TYPE */}
      <Text className="mb-2 font-bold">Select Type</Text>
      <View className="flex-row mb-4">
        {types.map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setType(t)}
            className={`p-3 mr-2 rounded ${
              type === t ? "bg-green-600" : "bg-white"
            }`}
          >
            <Text className={type === t ? "text-white" : ""}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* INPUTS */}
      <TextInput
        placeholder="Total birds"
        value={count}
        onChangeText={setCount}
        keyboardType="numeric"
        className="bg-white p-3 rounded mb-3"
      />

      <TextInput
        placeholder="Male birds"
        value={males}
        onChangeText={setMales}
        keyboardType="numeric"
        className="bg-white p-3 rounded mb-3"
      />

      <TextInput
        placeholder="Age (weeks)"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        className="bg-white p-3 rounded mb-4"
      />

      {/* BUTTON */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-green-600 p-4 rounded-xl"
      >
        <Text className="text-white text-center font-bold">
          Save Flock
        </Text>
      </TouchableOpacity>

      {/* RESULT */}
      {result && (
        <View className="mt-4 bg-white p-4 rounded-xl">
          <Text>Saved: {result.type}</Text>
          <Text>Count: {result.count}</Text>
        </View>
      )}

    </ScrollView>
  );
}