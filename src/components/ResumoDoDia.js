import { StyleSheet, View } from 'react-native';
import { Avatar, Surface, Text, useTheme } from 'react-native-paper';
import BarraProgresso from './BarraProgresso';

export default function ResumoDoDia({ habitos }) {
  const tema = useTheme();
  const total = habitos.length;
  const concluidos = habitos.filter((habito) => habito.concluidoHoje).length;
  const progresso = total > 0 ? concluidos / total : 0;
  const corTexto = { color: tema.colors.onPrimaryContainer };

  return (
    <Surface
      elevation={0}
      style={[
        styles.cartao,
        {
          backgroundColor: tema.colors.primaryContainer,
          borderRadius: tema.roundness * 4,
        },
      ]}
    >
      <View style={styles.linha}>
        <View style={styles.textos}>
          <Text variant="labelLarge" style={corTexto}>
            Progresso de hoje
          </Text>
          <Text variant="headlineSmall" style={corTexto}>
            {concluidos} de {total} hábitos
          </Text>
        </View>
        <Avatar.Icon
          size={52}
          icon="trophy-outline"
          color={tema.colors.onPrimary}
          style={{ backgroundColor: tema.colors.primary }}
        />
      </View>
      <BarraProgresso progresso={progresso} cor={tema.colors.primary} />
      <Text variant="bodySmall" style={corTexto}>
        {Math.round(progresso * 100)}% dos hábitos concluídos
      </Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  cartao: {
    padding: 20,
    gap: 12,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textos: {
    gap: 4,
  },
});
