import React, { createContext, useState } from 'react';

const RecoveryContext = createContext({
  showRecovery: () => {},
  isActive: false,
});

const RecoveryProvider = ({ children }: { children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const showRecovery = () => {
    setIsActive(!isActive);
  };
  return (
    <RecoveryContext.Provider
      value={{
        showRecovery,
        isActive,
      }}>
      {children}
    </RecoveryContext.Provider>
  );
};

export { RecoveryContext };
export default RecoveryProvider;
