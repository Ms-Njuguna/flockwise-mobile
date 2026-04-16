import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export function EggChart({ data }) {
  return (
    <LineChart
      data={{
        labels: data.map((_, i) => `D${i + 1}`),
        datasets: [{ data: data.map(d => d.eggs_collected) }]
      }}
      width={width - 20}
      height={220}
      chartConfig={{
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: () => "#16a34a",
      }}
    />
  );
}