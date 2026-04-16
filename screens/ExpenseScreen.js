import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { createExpense } from "../api/expenses";

const categories = [
  "feed",
  "transport",
  "medicine",
  "equipment",
  "birds",
  "repairs",
  "utilities",
];

export default function ExpenseScreen() {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const value = parseFloat(amount);

    if (!category || isNaN(value)) {
      alert("Enter valid data");
      return;
    }

    try {
      await createExpense({
        category,
        amount: value,
        description,
      });

      setResult({
        category,
        amount: value,
      });

      // reset fields
      setAmount("");
      setDescription("");
      setCategory("");

    } catch (err) {
      console.log(err);
      alert("Error saving expense");
    }
  };

  return (
    <ScrollView className="flex-1 p-4 bg-green-50">

      <Text className="text-2xl font-bold mb-4">
        💸 Expense Tracker
      </Text>

      {/* CATEGORY SELECT */}
      <Text className="mb-2 font-bold">Select Category</Text>
      <View className="flex-row flex-wrap mb-4">
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            className={`p-2 m-1 rounded-lg ${
              category === cat ? "bg-green-600" : "bg-white"
            }`}
          >
            <Text className={category === cat ? "text-white" : ""}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* INPUTS */}
      <TextInput
        placeholder="Amount (KES)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        className="bg-white p-3 rounded mb-3"
      />

      <TextInput
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        className="bg-white p-3 rounded mb-4"
      />

      {/* BUTTON */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-green-600 p-4 rounded-xl"
      >
        <Text className="text-white text-center font-bold">
          Save Expense
        </Text>
      </TouchableOpacity>

      {/* RESULT */}
      {result && (
        <View className="mt-4 bg-white p-4 rounded-xl">
          <Text>Saved: {result.category}</Text>
          <Text>Amount: KES {result.amount}</Text>
        </View>
      )}

    </ScrollView>
  );
}