import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import tokenStorage from '../../utils/tokenStorage';

const initialState = {
  isAuthenticated: false,
  actions: {
    login: () => {},
    logout: () => {},
  },
};

const AuthContext = createContext<ContextType>(initialState);

type Props = {
  children: ReactNode;
};

export type ContextType = {
  isAuthenticated: boolean;
  actions: { login(): void; logout(): void };
};

export function AuthContextProvider({ children }: Props) {
  const [userToken, setUserToken] = useState<string | null>(
    tokenStorage.getToken()
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    userToken ? true : false
  );
  const actions = useMemo(
    () => ({
      login() {
        setIsAuthenticated(true);
      },
      logout() {
        setIsAuthenticated(false);
      },
    }),
    []
  );
  const value = useMemo(
    () => ({ isAuthenticated, actions }),
    [isAuthenticated, actions]
  );

  useEffect(() => {
    setUserToken(tokenStorage.getToken());
    userToken !== null ? actions.login() : actions.logout();
  }, [userToken, setIsAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuthContext() {
  const value = useContext(AuthContext);
  if (value === undefined) {
    throw new Error('AuthContext should be used within AuthContext.Provider');
  }
  return value;
}
