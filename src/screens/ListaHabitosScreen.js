import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  Appbar,
  FAB,
  Searchbar,
  SegmentedButtons,
  Snackbar,
  Text,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HabitoCard from '../components/HabitoCard';
import ResumoDoDia from '../components/ResumoDoDia';
import { useHabitos } from '../contexts/HabitosContext';
import { useTema } from '../contexts/TemaContext';

const FILTROS = [
  { value: 'todos', label: 'Todos', icon: 'format-list-checks' },
  { value: 'pendentes', label: 'A fazer', icon: 'clock-outline' },
  { value: 'feitos', label: 'Feitos', icon: 'check' },
];

export default function ListaHabitosScreen({ navigation }) {
  const { habitos, alternarConclusao } = useHabitos();
  const { modoEscuro, alternarTema } = useTema();
  const insets = useSafeAreaInsets();
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('todos');
  const [aviso, setAviso] = useState({ visivel: false, texto: '', habitoId: null });

  const termoBusca = busca.trim().toLowerCase();
  const habitosVisiveis = habitos.filter((habito) => {
    const correspondeBusca = habito.nome.toLowerCase().includes(termoBusca);
    const correspondeFiltro =
      filtro === 'todos' ||
      (filtro === 'feitos' ? habito.concluidoHoje : !habito.concluidoHoje);
    return correspondeBusca && correspondeFiltro;
  });

  const marcarHabito = (habito) => {
    alternarConclusao(habito.id);
    setAviso({
      visivel: true,
      habitoId: habito.id,
      texto: habito.concluidoHoje
        ? `"${habito.nome}" voltou para pendentes.`
        : `"${habito.nome}" concluído hoje!`,
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        <Appbar.Content title="Meus Hábitos" />
        <Appbar.Action
          icon={modoEscuro ? 'white-balance-sunny' : 'weather-night'}
          accessibilityLabel="Alternar tema"
          onPress={alternarTema}
        />
      </Appbar.Header>

      <FlatList
        data={habitosVisiveis}
        keyExtractor={(habito) => habito.id}
        contentContainerStyle={[
          styles.lista,
          { paddingBottom: insets.bottom + 96 },
        ]}
        ListHeaderComponent={
          <View style={styles.cabecalhoLista}>
            <ResumoDoDia habitos={habitos} />
            <Searchbar
              placeholder="Buscar hábito"
              value={busca}
              onChangeText={setBusca}
            />
            <SegmentedButtons
              value={filtro}
              onValueChange={setFiltro}
              buttons={FILTROS}
            />
          </View>
        }
        ListEmptyComponent={
          <Text variant="bodyLarge" style={styles.vazio}>
            Nenhum hábito encontrado.
          </Text>
        }
        renderItem={({ item }) => (
          <HabitoCard
            habito={item}
            onAlternar={() => marcarHabito(item)}
            onPress={() =>
              navigation.navigate('DetalhesHabito', { id: item.id })
            }
          />
        )}
      />

      <FAB
        icon="plus"
        label="Novo hábito"
        style={[styles.fab, { bottom: insets.bottom + 16 }]}
        onPress={() => navigation.navigate('NovoHabito')}
      />

      <Snackbar
        visible={aviso.visivel}
        onDismiss={() => setAviso((atual) => ({ ...atual, visivel: false }))}
        duration={3000}
        wrapperStyle={{ bottom: insets.bottom + 72 }}
        action={{
          label: 'Desfazer',
          onPress: () => alternarConclusao(aviso.habitoId),
        }}
      >
        {aviso.texto}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lista: {
    padding: 16,
  },
  cabecalhoLista: {
    gap: 16,
    marginBottom: 16,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 24,
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    right: 16,
  },
});
