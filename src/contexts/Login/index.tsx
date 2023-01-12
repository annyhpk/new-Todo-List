import { createContext, ReactNode, useState, useEffect, useMemo, useContext } from 'react';
import tokenStorage from '../../utils/tokenStorage';

const initialState = {
  isLogin: false,
  actions: {
    login: () => {},
    logout: () => {},
  },
};

const LoginContext = createContext<ContextType>(initialState);

type Props = {
  children: ReactNode;
};

export type ContextType = {
  isLogin: boolean;
  actions: { login(): void; logout(): void };
};

export function LoginContextProvider({ children }: Props) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const actions = useMemo(
    () => ({
      login() {
        setIsLogin(true);
      },
      logout() {
        setIsLogin(false);
      },
    }),
    []
  );
  const value = useMemo(() => ({ isLogin, actions }), [isLogin, actions]);

  useEffect(() => {
    setUserToken(tokenStorage.getToken());
    userToken !== null ? actions.login() : actions.logout();
  }, [userToken, isLogin, setIsLogin]);

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export default function useLoginContext() {
  const value = useContext(LoginContext);
  if (value === undefined) {
    throw new Error('LoginContext should be used within LoginContext.Provider');
  }
  return value;
}
