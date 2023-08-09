import { FieldValues, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const SignInPage = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: FieldValues): void =>
    console.log(JSON.stringify(data));

  return (
    <div className="registration__page content">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
        <InputText
          className="mb-5"
          {...register('email')}
          type="email"
          placeholder="Enter your email"
        />
        <InputText
          className="mb-5"
          {...register('password')}
          type="password"
          placeholder="Enter your password"
          autoComplete="on"
        />
        <Button className="mb-7" label="Sign In" type="submit" disabled />
      </form>
      <h4 className="center mb-2 pl-2 pr-2 text-center">
        If you are not registered, please register in our store.
      </h4>
      <Button
        className="mt-3 mb-8"
        label="Registration"
        type="button"
        onClick={(): void => {
          console.log('click');
        }}
      />
    </div>
  );
};
