import { View, Text, Dimensions } from "react-native";
import { useContext } from "react";
import { FarmContext } from "../context/FarmContext";
import { LineChart } from "react-native-chart-kit";

export default function InsightsScreen() {
  const { records } = useContext(FarmContext);

  const last7 = records.slice(-7);

  const eggData = last7.map(r => r.eggs);

  if (!eggData || eggData.length === 0) {
    return <View className="p-4"><Text>No data available</Text></View>;
  }

  return (
    <View className="flex-1 p-4 bg-green-50">

      <Text className="text-xl font-bold mb-4">
        Weekly Egg Production
      </Text>

      {eggData.length > 0 ? (
        <LineChart
          data={{
            labels: eggData.map((_, i) => `D${i+1}`),
            datasets: [{ data: eggData }],
          }}
          width={Dimensions.get("window").width - 40} // Adjusted for padding
          height={220}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            // 🔥 ADD THESE TWO LINES BELOW:
            color: (opacity = 1) => `rgba(22, 163, 74, ${opacity})`, // Green color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black text
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#16a34a",
            },
          }}
          bezier // Makes the line smooth
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : (
        <Text>No data yet</Text>
      )}

    </View>
  );
}