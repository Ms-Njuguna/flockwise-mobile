import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import FlockScreen from "../screens/FlockScreen";
import RecordScreen from "../screens/RecordScreen";
import FeedScreen from "../screens/FeedScreen";
import InsightsScreen from "../screens/InsightsScreen";
import IncomeScreen from "../screens/IncomeScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Flocks" component={FlockScreen} />
      <Tab.Screen name="Records" component={RecordScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Income" component={IncomeScreen} />
    </Tab.Navigator>
  );
}