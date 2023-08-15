import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { registerNewCustomer } from '../../api/Client';
import { RegistrationForm } from './RegistrationForm';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { IRegistrationForm } from '../../interface/interface';
import { newCustomerData1, newAddress } from '../../constants/registratForm';

export const takeDataForm = (dataForm: IRegistrationForm): void => {
  if (dataForm.dateOfBirth) {
    dataForm.dateOfBirth = new Date(dataForm.dateOfBirth)
      .toLocaleDateString()
      .split('.')
      .reverse()
      .join('-');
  } else {
    dataForm.dateOfBirth = '';
  }
  dataForm.country = dataForm.country.slice(-3).slice(0, -1);
  newAddress[0].country = dataForm.country;
  newAddress[0].city = dataForm.city;
  if (dataForm.postalCode !== undefined) {
    newAddress[0].postalCode = dataForm.postalCode;
  }

  newAddress[0].streetName = dataForm.firstName;
  newAddress[0].streetNumber = '5';
  newCustomerData1.firstName = dataForm.firstName;
  newCustomerData1.lastName = dataForm.lastName;
  newCustomerData1.email =
    typeof dataForm.email === 'string' ? dataForm.email : '';
  newCustomerData1.password =
    typeof dataForm.password === 'string' ? dataForm.password : '';
  newCustomerData1.dateOfBirth =
    typeof dataForm.dateOfBirth === 'string' ? dataForm.dateOfBirth : '';
  newCustomerData1.addresses = newAddress;
  console.log(JSON.stringify(newCustomerData1));
  console.log(newAddress);
};

export const EntryDataForm = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const SignInPage = useNavigate();
  const MainPage = useNavigate();
  const onOfPoUpForm = (): void => {
    handleRegistration();
  };
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
    <div className="registration__page content">
      <RegistrationForm create={onOfPoUpForm} />
      <Dialog
        header="Notification for you"
        visible={visible}
        style={{
          width: '40vw',
          textAlign: 'center',
        }}
        onHide={(): void => {
          setVisible(false);
          // SignInPage('/signin');
          MainPage('/');
        }}>
        <p className="m-1 message-for-user ">{registrationMessage}</p>
      </Dialog>
      <Button
        className="mt-3 mb-1"
        label="Переход Вход=Login"
        type="button"
        onClick={(): void => {
          SignInPage('/signin');
          // MainPage('/');
        }}
      />
    </div>
  );
};
export default EntryDataForm;
