import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { INewPassword } from '../../types/interface';
import { validPasswordForm } from './utils/validRegisterData';
import { ErrorMessage } from './ErrorMessage';
import { Checkbox } from 'primereact/checkbox';
import styles from './RegistrationForm.module.scss';
import { count } from '../../constants/registratForm';
import { newUserPassword } from '../../api/requestAddress';

count.ID = localStorage.getItem('id') as string;

export const NewPasswordForm = (props: {
  toBack: (errorMessage: string) => void;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewPassword>({
    mode: 'onBlur',
    resolver: yupResolver(validPasswordForm),
  });
  const [checkedOldPassword, setCheckedOldPassword] = useState(false);
  const [checkedNewPassword, setCheckedNewPassword] = useState(false);
  const onSubmit: SubmitHandler<INewPassword> = (data: INewPassword): void => {
    const callback = (errorMessage: string): void => {
      props.toBack(errorMessage);
    };
    newUserPassword(data.passwordOld, data.passwordNew, callback);
  };

  return (
    <div className={styles.registration_data_name}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
        <div className="p-inputgroup mb-1">
          <InputText
            className={styles.input}
            {...register('passwordOld')}
            type={!checkedOldPassword ? 'password' : 'text'}
            placeholder="Enter your Old password"
            autoComplete="on"
          />
          <span className={(styles.span, 'p-inputgroup-addon')}>
            <Checkbox
              checked={checkedOldPassword}
              onChange={(): void => setCheckedOldPassword(!checkedOldPassword)}
            />
          </span>
        </div>

        <ErrorMessage err={errors.passwordOld?.message} />

        <div className="p-inputgroup mb-1">
          <InputText
            className={styles.input}
            {...register('passwordNew')}
            type={!checkedNewPassword ? 'password' : 'text'}
            placeholder="Enter your New password"
            autoComplete="on"
          />
          <span className={(styles.span, 'p-inputgroup-addon')}>
            <Checkbox
              checked={checkedNewPassword}
              onChange={(): void => setCheckedNewPassword(!checkedNewPassword)}
            />
          </span>
        </div>

        <ErrorMessage err={errors.passwordNew?.message} />

        <Button
          className="mt-3 mb-1 border-round-lg"
          label="Save"
          type="submit"
          onClick={(): void => {}}
        />
      </form>
    </div>
  );
};
export default NewPasswordForm;
