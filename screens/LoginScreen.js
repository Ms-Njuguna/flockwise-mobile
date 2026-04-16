import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { loginUser } from "../api/auth";
import * as Google from "expo-auth-session/providers/google";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
       expoClientId: "YOUR_GOOGLE_CLIENT_ID",
    });

  useEffect(() => {
      if (response?.type === "success") {
         console.log(response.authentication);
      }
  }, [response]);

  const handleLogin = async () => {
    try {
      const res = await loginUser({ username, password });
      console.log(res.data.access);

      alert("Login successful");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <View className="flex-1 p-4 justify-center">
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} className="bg-white p-3 mb-3" />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} className="bg-white p-3 mb-3" />

      <TouchableOpacity onPress={handleLogin} className="bg-green-600 p-4">
        <Text className="text-white text-center">Login</Text>
      </TouchableOpacity>
    </View>
  );
}