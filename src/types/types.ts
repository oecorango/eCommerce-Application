import { Dispatch, SetStateAction } from 'react';
import { FieldErrors } from 'react-hook-form';
import { IRegistrationForm } from '../interface/interface';

export type IAuth = {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
};

export type err = {
  err: FieldErrors<IRegistrationForm>;
  name: string;
};
