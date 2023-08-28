import { Dispatch, SetStateAction } from 'react';

export type IAuth = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export type errorMessage = {
  err: string | undefined;
};

export type CategoryProduct = {
  name: string;
  id: string;
};
