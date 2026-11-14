import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HabitosProvider } from './src/contexts/HabitosContext';
import { TemaContext } from './src/contexts/TemaContext';
import Rotas from './src/navigation/Rotas';
import {
  navegacaoClara,
  navegacaoEscura,
  temaClaro,
  temaEscuro,
} from './src/theme/tema';

export default function App() {
  const [modoEscuro, setModoEscuro] = useState(false);
  const alternarTema = () => setModoEscuro((atual) => !atual);

  return (
    <SafeAreaProvider>
      <TemaContext.Provider value={{ modoEscuro, alternarTema }}>
        <PaperProvider theme={modoEscuro ? temaEscuro : temaClaro}>
          <HabitosProvider>
            <NavigationContainer
              theme={modoEscuro ? navegacaoEscura : navegacaoClara}
            >
              <Rotas />
            </NavigationContainer>
          </HabitosProvider>
          <StatusBar style={modoEscuro ? 'light' : 'dark'} />
        </PaperProvider>
      </TemaContext.Provider>
    </SafeAreaProvider>
  );
}
