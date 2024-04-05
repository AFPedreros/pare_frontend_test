import { useState } from 'react';
import { getVarSsn, setLogin } from '@/lib/utils';

export const useToken = () => {
  const getToken = () => {
    const userToken = getVarSsn();
    return userToken?.TCOD;
  };

  const [token, setToken] = useState(getToken());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveToken = (userToken: any) => {
    setLogin(userToken);
    setToken(userToken.TCOD);
  };

  return {
    setToken: saveToken,
    token,
  };
};
