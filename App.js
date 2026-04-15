import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./navigation/BottomTabs";
import { FarmProvider } from "./context/FarmContext";

export default function App() {
  return (
    <FarmProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </FarmProvider>
  );
}