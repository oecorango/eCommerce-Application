import { createContext, Dispatch, SetStateAction } from 'react';

type IAuth = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext({} as IAuth);
