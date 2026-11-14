export const CATEGORIAS = [
  { valor: 'saude', rotulo: 'Saúde', icone: 'heart-pulse', cor: '#D64550' },
  { valor: 'estudos', rotulo: 'Estudos', icone: 'book-open-variant', cor: '#3E63DD' },
  { valor: 'bem-estar', rotulo: 'Bem-estar', icone: 'meditation', cor: '#8E4EC6' },
  { valor: 'produtividade', rotulo: 'Produtividade', icone: 'rocket-launch', cor: '#E2711D' },
];

export const PERIODOS = [
  { valor: 'manha', rotulo: 'Manhã', icone: 'weather-sunset-up' },
  { valor: 'tarde', rotulo: 'Tarde', icone: 'weather-sunny' },
  { valor: 'noite', rotulo: 'Noite', icone: 'weather-night' },
];

export const buscarCategoria = (valor) =>
  CATEGORIAS.find((categoria) => categoria.valor === valor);

export const buscarPeriodo = (valor) =>
  PERIODOS.find((periodo) => periodo.valor === valor);
