import { createContext, useContext, useState } from 'react';
import { HABITOS_INICIAIS } from '../data/habitosIniciais';

const HabitosContext = createContext(null);

export function HabitosProvider({ children }) {
  const [habitos, setHabitos] = useState(HABITOS_INICIAIS);

  const atualizarHabito = (id, gerarAlteracoes) => {
    setHabitos((lista) =>
      lista.map((habito) =>
        habito.id === id ? { ...habito, ...gerarAlteracoes(habito) } : habito
      )
    );
  };

  const adicionarHabito = (dados) => {
    const novoHabito = {
      ...dados,
      id: String(Date.now()),
      diasConcluidos: 0,
      concluidoHoje: false,
    };
    setHabitos((lista) => [novoHabito, ...lista]);
  };

  const alternarConclusao = (id) =>
    atualizarHabito(id, (habito) => ({
      concluidoHoje: !habito.concluidoHoje,
      diasConcluidos: habito.diasConcluidos + (habito.concluidoHoje ? -1 : 1),
    }));

  const alternarLembrete = (id) =>
    atualizarHabito(id, (habito) => ({ lembrete: !habito.lembrete }));

  const removerHabito = (id) =>
    setHabitos((lista) => lista.filter((habito) => habito.id !== id));

  return (
    <HabitosContext.Provider
      value={{
        habitos,
        adicionarHabito,
        alternarConclusao,
        alternarLembrete,
        removerHabito,
      }}
    >
      {children}
    </HabitosContext.Provider>
  );
}

export const useHabitos = () => useContext(HabitosContext);
