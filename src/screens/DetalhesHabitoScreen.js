import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Chip,
  Dialog,
  Divider,
  List,
  Portal,
  Switch,
  Text,
  useTheme,
} from 'react-native-paper';
import BarraProgresso from '../components/BarraProgresso';
import { useHabitos } from '../contexts/HabitosContext';
import { buscarCategoria, buscarPeriodo } from '../data/opcoes';

export default function DetalhesHabitoScreen({ navigation, route }) {
  const { habitos, alternarConclusao, alternarLembrete, removerHabito } =
    useHabitos();
  const tema = useTheme();
  const [dialogoVisivel, setDialogoVisivel] = useState(false);

  const habito = habitos.find((item) => item.id === route.params.id);

  if (!habito) {
    return null;
  }

  const categoria = buscarCategoria(habito.categoria);
  const periodo = buscarPeriodo(habito.periodo);
  const metaAtingida = habito.diasConcluidos >= habito.metaSemanal;
  const progressoSemanal = Math.min(habito.diasConcluidos / habito.metaSemanal, 1);

  const excluir = () => {
    setDialogoVisivel(false);
    navigation.goBack();
    removerHabito(habito.id);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detalhes" />
        <Appbar.Action
          icon="delete-outline"
          accessibilityLabel="Excluir hábito"
          onPress={() => setDialogoVisivel(true)}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <Card mode="contained">
          <Card.Content style={styles.destaque}>
            <Avatar.Icon
              size={72}
              icon={categoria.icone}
              color="#FFFFFF"
              style={{ backgroundColor: categoria.cor }}
            />
            <Text variant="headlineSmall" style={styles.centralizado}>
              {habito.nome}
            </Text>
            <Text variant="bodyMedium" style={styles.descricao}>
              {habito.descricao || 'Sem descrição.'}
            </Text>
            <View style={styles.chips}>
              <Chip icon={categoria.icone}>{categoria.rotulo}</Chip>
              <Chip icon={periodo.icone}>{periodo.rotulo}</Chip>
            </View>
          </Card.Content>
        </Card>

        <Card mode="elevated">
          <Card.Title
            title="Meta semanal"
            subtitle={`${habito.diasConcluidos} de ${habito.metaSemanal} dias concluídos`}
            left={(props) => <Avatar.Icon {...props} icon="target" />}
          />
          <Card.Content style={styles.secao}>
            <BarraProgresso
              progresso={progressoSemanal}
              cor={metaAtingida ? tema.colors.tertiary : tema.colors.primary}
            />
            {metaAtingida && (
              <Chip
                icon="trophy-outline"
                style={{ backgroundColor: tema.colors.tertiaryContainer }}
                textStyle={{ color: tema.colors.onTertiaryContainer }}
              >
                Meta da semana atingida!
              </Chip>
            )}
          </Card.Content>
        </Card>

        <Card mode="outlined">
          <List.Section>
            <List.Subheader>Configurações</List.Subheader>
            <List.Item
              title="Lembrete diário"
              description={
                habito.lembrete
                  ? `Aviso no período da ${periodo.rotulo.toLowerCase()}`
                  : 'Desativado'
              }
              left={(props) => <List.Icon {...props} icon="bell-outline" />}
              right={() => (
                <Switch
                  value={habito.lembrete}
                  onValueChange={() => alternarLembrete(habito.id)}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Status de hoje"
              description={habito.concluidoHoje ? 'Concluído' : 'Pendente'}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={habito.concluidoHoje ? 'check-circle-outline' : 'clock-outline'}
                />
              )}
            />
          </List.Section>
        </Card>

        <Button
          mode={habito.concluidoHoje ? 'outlined' : 'contained'}
          icon={habito.concluidoHoje ? 'close' : 'check'}
          contentStyle={styles.botaoConteudo}
          onPress={() => alternarConclusao(habito.id)}
        >
          {habito.concluidoHoje ? 'Desmarcar conclusão de hoje' : 'Marcar como feito hoje'}
        </Button>
      </ScrollView>

      <Portal>
        <Dialog visible={dialogoVisivel} onDismiss={() => setDialogoVisivel(false)}>
          <Dialog.Icon icon="delete-outline" />
          <Dialog.Title style={styles.centralizado}>Excluir hábito?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              "{habito.nome}" será removido da sua lista e o progresso da semana será perdido.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogoVisivel(false)}>Cancelar</Button>
            <Button textColor={tema.colors.error} onPress={excluir}>
              Excluir
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conteudo: {
    padding: 16,
    gap: 16,
    paddingBottom: 40,
  },
  destaque: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  centralizado: {
    textAlign: 'center',
  },
  descricao: {
    textAlign: 'center',
    opacity: 0.8,
  },
  chips: {
    flexDirection: 'row',
    gap: 8,
  },
  secao: {
    gap: 12,
  },
  botaoConteudo: {
    paddingVertical: 6,
  },
});
