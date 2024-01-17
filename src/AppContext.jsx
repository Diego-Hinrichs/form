import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [encuestaData, setEncuestaData] = useState([]);
  const addRespuesta = (respuesta) => {
    setEncuestaData((prevData) => [...prevData, respuesta]);
  };

  return (
    <AppContext.Provider value={{ encuestaData, addRespuesta }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;