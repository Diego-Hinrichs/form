import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialData = JSON.parse(localStorage.getItem('encuestaData')) || [];
  const [encuestaData, setEncuestaData] = useState(initialData);

  const addAnswer = (respuesta) => {
    setEncuestaData((prevData) => [...prevData, respuesta]);
  };

  const cleanStorage = () => {
    const storedData = localStorage.getItem('encuestaData');
    if (storedData) { 
      setEncuestaData([]);
    }
  }

  useEffect(() => {
    localStorage.setItem('encuestaData', JSON.stringify(encuestaData));
  },[encuestaData])

  return (
    <AppContext.Provider value={{ encuestaData, addAnswer, cleanStorage }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;