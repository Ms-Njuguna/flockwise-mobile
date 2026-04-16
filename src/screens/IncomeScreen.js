import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { createEggRecord, createBirdSale } from "../api/income";

export default function IncomeScreen() {
  // 🥚 Eggs
  const [eggsCollected, setEggsCollected] = useState("");
  const [broken, setBroken] = useState("");
  const [consumed, setConsumed] = useState("");
  const [sold, setSold] = useState("");
  const [price, setPrice] = useState("");

  // 🐔 Birds
  const [birdsSold, setBirdsSold] = useState("");
  const [birdPrice, setBirdPrice] = useState("");

  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const eggs = parseInt(eggsCollected) || 0;
    const brokenEggs = parseInt(broken) || 0;
    const consumedEggs = parseInt(consumed) || 0;
    const soldEggs = parseInt(sold) || 0;
    const eggPrice = parseFloat(price) || 0;

    const birdNum = parseInt(birdsSold) || 0;
    const birdPriceVal = parseFloat(birdPrice) || 0;

    // 💰 CALCULATIONS
    const eggIncome = soldEggs * eggPrice;
    const birdIncome = birdNum * birdPriceVal;
    const totalIncome = eggIncome + birdIncome;

    try {
      // 🔗 API CALLS
      await createEggRecord({
        eggs_collected: eggs,
        broken: brokenEggs,
        consumed: consumedEggs,
        sold: soldEggs,
        price_per_egg: eggPrice,
      });

      await createBirdSale({
        number_sold: birdNum,
        price_per_bird: birdPriceVal,
      });

      setResult({
        eggIncome,
        birdIncome,
        totalIncome,
      });
    } catch (err) {
      console.log(err);
      alert("Error saving data");
    }
  };

  return (
    <ScrollView className="flex-1 p-4 bg-green-50">

      <Text className="text-2xl font-bold mb-4">
        💰 Income Tracker
      </Text>

      {/* 🥚 EGGS */}
      <Text className="font-bold mb-2">Egg Production</Text>

      <TextInput placeholder="Collected" value={eggsCollected} onChangeText={setEggsCollected} className="bg-white p-3 rounded mb-2" keyboardType="numeric" />
      <TextInput placeholder="Broken" value={broken} onChangeText={setBroken} className="bg-white p-3 rounded mb-2" keyboardType="numeric" />
      <TextInput placeholder="Consumed" value={consumed} onChangeText={setConsumed} className="bg-white p-3 rounded mb-2" keyboardType="numeric" />
      <TextInput placeholder="Sold" value={sold} onChangeText={setSold} className="bg-white p-3 rounded mb-2" keyboardType="numeric" />
      <TextInput placeholder="Price per egg" value={price} onChangeText={setPrice} className="bg-white p-3 rounded mb-4" keyboardType="numeric" />

      {/* 🐔 BIRDS */}
      <Text className="font-bold mb-2">Bird Sales</Text>

      <TextInput placeholder="Birds sold" value={birdsSold} onChangeText={setBirdsSold} className="bg-white p-3 rounded mb-2" keyboardType="numeric" />
      <TextInput placeholder="Price per bird" value={birdPrice} onChangeText={setBirdPrice} className="bg-white p-3 rounded mb-4" keyboardType="numeric" />

      {/* BUTTON */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-green-600 p-4 rounded-xl"
      >
        <Text className="text-white text-center font-bold">
          Save Income
        </Text>
      </TouchableOpacity>

      {/* RESULTS */}
      {result && (
        <View className="mt-4 bg-white p-4 rounded-xl">
          <Text>Egg Income: KES {result.eggIncome}</Text>
          <Text>Bird Income: KES {result.birdIncome}</Text>
          <Text className="font-bold mt-2">
            Total: KES {result.totalIncome}
          </Text>
        </View>
      )}

    </ScrollView>
  );
}