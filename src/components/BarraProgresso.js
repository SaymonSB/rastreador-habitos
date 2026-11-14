import { StyleSheet, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

export default function BarraProgresso({ progresso, cor }) {
  return (
    <View style={styles.container}>
      <ProgressBar progress={progresso} color={cor} style={styles.barra} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
  },
  barra: {
    height: 10,
    borderRadius: 5,
  },
});
