import { SubmitHandler, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { clientSignIn } from '../api/Client';
import { SignInForm } from '../interface/interface';
import { useNavigate } from 'react-router-dom';

export const SignInPage = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInForm>({
    mode: 'onBlur',
  });

  const toRegistrationForm = useNavigate();
  const isValidUser = useNavigate();

  const onSubmit: SubmitHandler<SignInForm> = (data): void => {
    clientSignIn(data)
      .execute()
      .then(data => {
        if (data.statusCode === 200) {
          const idUser = data.body.customer.id;
          localStorage.setItem('id', idUser);
          isValidUser('/');
        }
      })
      .catch(() =>
        setError('email', {
          type: 'manual',
          message: 'Email or password is incorrect',
        }),
      );
  };

  return (
    <div className="registration__page content">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
        <InputText
          className="mb-1"
          {...register('email', {
            required: 'Required to fill',
            minLength: {
              value: 5,
              message: 'Minimum 5 characters',
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Incorrect email',
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

        <InputText
          className="mt-5 mb-1"
          {...register('password', {
            required: 'Required to fill',
            maxLength: {
              value: 20,
              message: 'Maximum 20 characters',
            },
            pattern: {
              value:
                /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
              message:
                'Password must contain at least 8 characters, one uppercase, one number and one special case character',
            },
          })}
          type="password"
          placeholder="Enter your password"
          autoComplete="on"
        />
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
