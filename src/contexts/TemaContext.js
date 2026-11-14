import { createContext, useContext } from 'react';

export const TemaContext = createContext({
  modoEscuro: false,
  alternarTema: () => {},
});

export const useTema = () => useContext(TemaContext);
