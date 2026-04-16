import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { askAI } from "../api/ai";

export default function AIScreen() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    const res = await askAI(question);
    setAnswer(res.answer);
  };

  return (
    <View className="flex-1 p-4">
      <TextInput
        placeholder="Ask anything about your farm..."
        value={question}
        onChangeText={setQuestion}
        className="bg-white p-3 mb-3"
      />

      <TouchableOpacity onPress={handleAsk} className="bg-green-600 p-3">
        <Text className="text-white text-center">Ask AI</Text>
      </TouchableOpacity>

      <Text className="mt-4">{answer}</Text>
    </View>
  );
}