import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import {
  Appbar,
  Button,
  Chip,
  HelperText,
  IconButton,
  RadioButton,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import HabitoCard from '../components/HabitoCard';
import { useHabitos } from '../contexts/HabitosContext';
import { CATEGORIAS, PERIODOS } from '../data/opcoes';

export default function NovoHabitoScreen({ navigation }) {
  const { adicionarHabito } = useHabitos();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIAS[0].valor);
  const [periodo, setPeriodo] = useState(PERIODOS[0].valor);
  const [metaSemanal, setMetaSemanal] = useState(5);
  const [lembrete, setLembrete] = useState(false);
  const [tentouSalvar, setTentouSalvar] = useState(false);

  const nomeInvalido = nome.trim().length < 3;
  const mostrarErroNome = tentouSalvar && nomeInvalido;

  const previa = {
    nome: nome.trim() || 'Nome do hábito',
    categoria,
    periodo,
    metaSemanal,
    lembrete,
    diasConcluidos: 0,
    concluidoHoje: false,
  };

  const salvar = () => {
    setTentouSalvar(true);
    if (nomeInvalido) return;

    adicionarHabito({
      nome: nome.trim(),
      descricao: descricao.trim(),
      categoria,
      periodo,
      metaSemanal,
      lembrete,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Novo hábito" />
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.formulario}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <TextInput
              mode="outlined"
              label="Nome do hábito"
              value={nome}
              onChangeText={setNome}
              error={mostrarErroNome}
              left={<TextInput.Icon icon="pencil-outline" />}
            />
            <HelperText type="error" visible={mostrarErroNome}>
              Informe um nome com pelo menos 3 letras.
            </HelperText>
          </View>

          <TextInput
            mode="outlined"
            label="Descrição (opcional)"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={3}
            left={<TextInput.Icon icon="text" />}
          />

          <View style={styles.secao}>
            <Text variant="titleMedium">Categoria</Text>
            <View style={styles.chips}>
              {CATEGORIAS.map((opcao) => (
                <Chip
                  key={opcao.valor}
                  icon={opcao.icone}
                  mode={categoria === opcao.valor ? 'flat' : 'outlined'}
                  selected={categoria === opcao.valor}
                  showSelectedOverlay
                  onPress={() => setCategoria(opcao.valor)}
                >
                  {opcao.rotulo}
                </Chip>
              ))}
            </View>
          </View>

          <View style={styles.secao}>
            <Text variant="titleMedium">Período do dia</Text>
            <RadioButton.Group value={periodo} onValueChange={setPeriodo}>
              {PERIODOS.map((opcao) => (
                <RadioButton.Item
                  key={opcao.valor}
                  label={opcao.rotulo}
                  value={opcao.valor}
                  mode="android"
                  style={styles.opcaoRadio}
                />
              ))}
            </RadioButton.Group>
          </View>

          <View style={styles.secao}>
            <Text variant="titleMedium">Meta semanal</Text>
            <View style={styles.contador}>
              <IconButton
                icon="minus"
                mode="contained-tonal"
                accessibilityLabel="Diminuir meta"
                disabled={metaSemanal <= 1}
                onPress={() => setMetaSemanal(metaSemanal - 1)}
              />
              <Text variant="headlineSmall">
                {metaSemanal} {metaSemanal === 1 ? 'dia' : 'dias'}
              </Text>
              <IconButton
                icon="plus"
                mode="contained-tonal"
                accessibilityLabel="Aumentar meta"
                disabled={metaSemanal >= 7}
                onPress={() => setMetaSemanal(metaSemanal + 1)}
              />
            </View>
          </View>

          <View style={styles.linhaLembrete}>
            <Text variant="titleMedium">Ativar lembrete</Text>
            <Switch value={lembrete} onValueChange={setLembrete} />
          </View>

          <View style={styles.secao}>
            <Text variant="titleMedium">Pré-visualização</Text>
            <HabitoCard habito={previa} />
          </View>

          <Button
            mode="contained"
            icon="check"
            contentStyle={styles.botaoConteudo}
            onPress={salvar}
          >
            Salvar hábito
          </Button>
          <Button mode="text" onPress={() => navigation.goBack()}>
            Cancelar
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formulario: {
    padding: 16,
    gap: 16,
    paddingBottom: 40,
  },
  secao: {
    gap: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opcaoRadio: {
    paddingVertical: 2,
  },
  contador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linhaLembrete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  botaoConteudo: {
    paddingVertical: 6,
  },
});
