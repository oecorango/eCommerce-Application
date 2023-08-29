import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { IUserData } from '../../types/interface';
import { validUserData } from './utils/validRegisterData';
import { ErrorMessage } from './ErrorMessage';
import styles from './RegistrationForm.module.scss';
import { userData, count } from '../../constants/registratForm';
import { editUserData } from '../../api/requestAddress';
import ListAddress from '../ListAddress';
import { updateUserData } from './utils/updateUserData';
import { getCustomerID } from '../../api/Client';
import { Dialog } from 'primereact/dialog';
import NewPasswordForm from './NewPasswordForm';

count.ID = localStorage.getItem('id') as string;
let switchRender = true;
let messageUser = '';
let asyncRender = async (): Promise<void> => {};
export const UserDataForm = (): JSX.Element => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserData>({
    mode: 'onBlur',
    resolver: yupResolver(validUserData),
    defaultValues: {
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: userData.dateOfBirth,
    },
  });
  if (switchRender) {
    asyncRender = async (): Promise<void> => {
      await getCustomerID(count.ID)
        .then(({ body }) => {
          updateUserData(body);
        })
        .catch(console.error);
      setValue('email', userData.email);
      setValue('firstName', userData.firstName);
      setValue('lastName', userData.lastName);
      setValue('dateOfBirth', userData.dateOfBirth);
    };
    asyncRender();
    switchRender = false;
  }

  const closeForm = (errorMessage: string): void => {
    if (errorMessage !== '') {
      messageUser = errorMessage;
    } else {
      messageUser = 'Your Password has been successfully saved';
    }
    setVisible(true);
  };
  const [visible, setVisible] = useState<boolean>(false);
  const [visiblePasswordForm, setvisiblePasswordForm] = useState(false);
  const onSubmit: SubmitHandler<IUserData> = (data: IUserData): void => {
    switchRender = true;
    const callback = (): void => {
      asyncRender();
      messageUser = 'Your data has been successfully saved';
      setVisible(true);
    };
    editUserData(data, callback);
  };

  return (
    <div className={styles.registration_data_name}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registration_address}>
        <label htmlFor="serial" className={styles.span_head}>
          My Data
        </label>
        <InputText
          className="mb-1 border-round-lg"
          {...register('email')}
          type="text"
          placeholder="Enter your email"
        />
        <ErrorMessage err={errors.email?.message} />

        <InputText
          className="mb-1 border-round-lg"
          {...register('firstName')}
          placeholder="Enter your firstName"
        />
        <ErrorMessage err={errors.firstName?.message} />

        <InputText
          className="mb-1 border-round-lg"
          {...register('lastName')}
          placeholder="Enter your LastName"
        />
        <ErrorMessage err={errors.lastName?.message} />

        <label className={styles.registration_span}>Date of your birth</label>
        <InputText
          className="mb-1 border-round-lg"
          type={'date'}
          {...register('dateOfBirth')}
        />
        <ErrorMessage err={errors.dateOfBirth?.message} />
        <Dialog
          className={styles.module__window}
          header="Notification"
          visible={visible}
          onHide={(): void => {
            setVisible(false);
          }}>
          <p className={styles.message}>{messageUser}</p>
        </Dialog>
        <Button
          className="mt-3 mb-1 border-round-lg"
          label="Save"
          type="submit"
        />
      </form>
      <div className="mb-5">
        <Dialog
          header="Change your Password"
          style={{ maxWidth: '80vw' }}
          visible={visiblePasswordForm}
          onHide={(): void => setvisiblePasswordForm(false)}>
          <NewPasswordForm toBack={closeForm} />
        </Dialog>
        <Button
          className="mt-3 mb-1"
          label="Change your Password"
          onClick={(): void => {
            setvisiblePasswordForm(true);
          }}
        />
      </div>
      <div className="mb-5">
        <ListAddress />
      </div>
    </div>
  );
};
export default UserDataForm;
