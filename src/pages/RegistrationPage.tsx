import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { registerNewCustomer } from '../api/Client';

const newAddress = [
  // эти данные тоже можно удалить
  {
    country: 'BY',
    city: 'Gomel',
    postalCode: '12345',
    streetName: 'Sovetskaya',
    streetNumber: '5',
  },
];
const newCustomerData1 = {
  // эти данные тоже можно удалить
  email: 'echf@mail.ru',
  password: 'qwerty',
  firstName: 'ursa',
  lastName: 'goremskiy',
  dateOfBirth: '2000-10-12',
  addresses: newAddress,
};

export const RegistrationPage = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegistration = (): void => {
    setIsLoading(true);
    registerNewCustomer(newCustomerData1)
      .then(data => {
        setRegistrationMessage(
          `Добро пожаловать ${data.body.customer.firstName} ${data.body.customer.lastName}`,
        );
        setVisible(true);
      })
      .catch(error => {
        console.warn(error);
        setRegistrationMessage('Произошла ошибка при регистрации.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="wrapper content">
      <Button // эту кнопку можно удалить, и использовать твою
        label={isLoading ? 'Loading...' : 'Register'}
        onClick={handleRegistration}
        disabled={isLoading}
      />
      {registrationMessage && (
        <Dialog
          header={isLoading ? 'Loading...' : 'Вы зарегистрировались'}
          visible={visible}
          style={{ width: '50vw' }}
          onHide={(): void => setVisible(false)}>
          <p className="m-0">{registrationMessage}</p>
        </Dialog>
      )}
      <h1>Registration</h1>
      <p>Registration</p>
    </div>
  );
};
