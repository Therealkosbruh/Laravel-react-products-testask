// import { createContext, useContext, useState } from 'react';

// // Создаем контекст пользователя
// const UserContext = createContext(null);

// // Провайдер контекста
// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userData) => setUser(userData);
//   const logout = () => setUser(null);

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Кастомный хук для использования контекста
// export const useUser = () => useContext(UserContext);


import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Восстанавливаем данные пользователя из localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
