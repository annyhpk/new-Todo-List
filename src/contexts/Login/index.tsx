import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  useMemo,
  SetStateAction,
} from 'react';

const State = {
  logined: false,
  setLogined: () => {},
};

const LoginContext = createContext<ContextType>(State);

type Props = {
  children: ReactNode;
};

export type ContextType = {
  logined: boolean;
  setLogined: Dispatch<SetStateAction<boolean>>;
};

export function LoginContextProvider({ children }: Props) {
  const [logined, setLogined] = useState<boolean>(false);
  const value = useMemo(() => ({ logined, setLogined }), [logined, setLogined]);

  useEffect(() => {
    localStorage.getItem('token') ? setLogined(true) : setLogined(false);
  }, [localStorage]);

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export default LoginContext;
