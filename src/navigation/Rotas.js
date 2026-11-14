import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetalhesHabitoScreen from '../screens/DetalhesHabitoScreen';
import ListaHabitosScreen from '../screens/ListaHabitosScreen';
import NovoHabitoScreen from '../screens/NovoHabitoScreen';

const Stack = createNativeStackNavigator();

export default function Rotas() {
  return (
    <Stack.Navigator
      initialRouteName="ListaHabitos"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="ListaHabitos" component={ListaHabitosScreen} />
      <Stack.Screen name="NovoHabito" component={NovoHabitoScreen} />
      <Stack.Screen name="DetalhesHabito" component={DetalhesHabitoScreen} />
    </Stack.Navigator>
  );
}
