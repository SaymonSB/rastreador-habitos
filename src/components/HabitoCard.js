import { StyleSheet } from 'react-native';
import { Avatar, Card, Checkbox, Chip } from 'react-native-paper';
import { buscarCategoria, buscarPeriodo } from '../data/opcoes';

export default function HabitoCard({ habito, onPress, onAlternar }) {
  const categoria = buscarCategoria(habito.categoria);
  const periodo = buscarPeriodo(habito.periodo);

  return (
    <Card mode="elevated" style={styles.card} onPress={onPress}>
      <Card.Title
        title={habito.nome}
        titleVariant="titleMedium"
        titleStyle={habito.concluidoHoje && styles.tituloConcluido}
        subtitle={`${categoria.rotulo} • ${periodo.rotulo}`}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={categoria.icone}
            color="#FFFFFF"
            style={{ backgroundColor: categoria.cor }}
          />
        )}
        right={() => (
          <Checkbox.Android
            status={habito.concluidoHoje ? 'checked' : 'unchecked'}
            onPress={onAlternar}
          />
        )}
        rightStyle={styles.direita}
      />
      <Card.Content style={styles.etiquetas}>
        <Chip compact icon="fire">
          {habito.diasConcluidos}/{habito.metaSemanal} na semana
        </Chip>
        {habito.lembrete && (
          <Chip compact icon="bell-ring-outline">
            Lembrete
          </Chip>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  tituloConcluido: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  direita: {
    marginRight: 8,
  },
  etiquetas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 4,
  },
});
