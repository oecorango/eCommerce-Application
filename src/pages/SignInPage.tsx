import { SubmitHandler, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Message } from 'primereact/message';
import { clientSignIn } from '../api/Client';
import { SignInForm } from '../interface/interface';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { REQUIRED } from '../constants/common';
import { REG_EX_EMAIL, REG_EX_PASSWORD } from '../constants/regEx';
import {
  ERR_EMAIL_TEXT,
  ERR_AUTHENTICATE,
  ERR_MAX_LENGTH_PASS,
  ERR_MAX_LENGTH_PASS_TEXT,
  ERR_MIN_LENGTH_EMAIL,
  ERR_MIN_LENGTH_EMAIL_TEXT,
  ERR_PASSWORD_TEXT,
} from '../constants/errors';
import { STATUS_OK } from '../constants/api';

export const SignInPage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInForm>({
    mode: 'onBlur',
  });

  const [checked, setChecked] = useState(false);
  const toRegistrationForm = useNavigate();
  const isValidUser = useNavigate();

  const onSubmit: SubmitHandler<SignInForm> = (data): void => {
    clientSignIn(data)
      .execute()
      .then(data => {
        if (data.statusCode === STATUS_OK) {
          const idUser = data.body.customer.id;
          localStorage.setItem('id', idUser);
          isValidUser('/');
        }
      })
      .catch(() =>
        setError('email', {
          type: 'manual',
          message: ERR_AUTHENTICATE,
        }),
      );
  };

  return (
    <div className="registration__page content">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
        <InputText
          className="mb-1"
          {...register('email', {
            required: REQUIRED,
            minLength: {
              value: ERR_MIN_LENGTH_EMAIL,
              message: ERR_MIN_LENGTH_EMAIL_TEXT,
            },
            pattern: {
              value: REG_EX_EMAIL,
              message: ERR_EMAIL_TEXT,
            },
          })}
          type="text"
          placeholder="Enter your email"
        />
        <Message
          className={
            ((errors?.email?.message as string) && 'h-1rem') || 'hidden'
          }
          severity={'error'}
          text={errors?.email?.message as string}
        />

        <div className="p-inputgroup">
          <InputText
            className="mt-5 mb-1"
            {...register('password', {
              required: REQUIRED,
              maxLength: {
                value: ERR_MAX_LENGTH_PASS,
                message: ERR_MAX_LENGTH_PASS_TEXT,
              },
              pattern: {
                value: REG_EX_PASSWORD,
                message: ERR_PASSWORD_TEXT,
              },
            })}
            type={!checked ? 'password' : 'text'}
            placeholder="Enter your password"
            autoComplete="off"
          />
          <span className="p-inputgroup-addon mt-5 mb-1">
            <Checkbox
              checked={checked}
              onChange={(): void => setChecked(!checked)}
            />
          </span>
        </div>

        <Message
          className={
            ((errors?.password?.message as string) && 'h-4rem') || 'hidden'
          }
          severity={'error'}
          text={errors?.password?.message as string}
        />

        <Button className="mt-6 mb-5" label="Sign In" type="submit" />
      </form>

      <h4 className="center mb-2 pl-2 pr-2 text-center">
        If you are not registered, please register in our store.
      </h4>

      <Button
        className="mt-3 mb-8"
        label="Registration"
        type="button"
        onClick={(): void => toRegistrationForm('/registration')}
      />
    </div>
  );
};
