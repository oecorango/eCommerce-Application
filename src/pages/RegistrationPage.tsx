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
  email: 'react@mail.ru',
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
          `Welcome ${data.body.customer.firstName} ${data.body.customer.lastName}`,
        );
        setVisible(true);
      })
      .catch(error => {
        console.warn(error);
        if (error.code === 400) {
          setRegistrationMessage(
            error.message + ' Log in or use another email address',
          );
          setVisible(true);
        } else {
          console.log(error.message + ' Should try again later');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="wrapper content">
      <Button // эту кнопку можно удалить, и использовать твою кнопку нажатия регистрации
        label={isLoading ? 'Loading...' : 'Register'}
        onClick={handleRegistration}
        disabled={isLoading}
      />

      <Dialog
        header="Notification for you"
        visible={visible}
        style={{
          width: '40vw',
          textAlign: 'center',
        }}
        onHide={(): void => setVisible(false)}>
        <p className="m-1 message-for-user ">{registrationMessage}</p>
      </Dialog>

      <h1>Registration</h1>
      <p>Registration</p>
    </div>
  );
};
// потом  можно будет разбить код, вынести в отдельный файл,
// и здесь например вставить один тег <RegistrationForm />
