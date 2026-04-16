import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import IncomeScreen from "../screens/IncomeScreen";
import ExpenseScreen from "../screens/ExpenseScreen";
import FlockScreen from "../screens/FlockScreen";
import InsightsScreen from "../screens/InsightsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Flock" component={FlockScreen} />
      <Tab.Screen name="Income" component={IncomeScreen} />
      <Tab.Screen name="Expenses" component={ExpenseScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
    </Tab.Navigator>
  );
}