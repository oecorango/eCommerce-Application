import { useContext, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { clientSignIn, registerNewCustomer } from '../../api/Client';
import { RegistrationForm } from './RegistrationForm';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { IRegistrationForm } from '../../interface/interface';
import { newCustomerData, newAddress } from '../../constants/registratForm';
import { AuthContext } from '../authProvider';
import { logIn } from '../../utils/utils';

export const takeDataForm = (
  dataForm: IRegistrationForm,
  shipp: boolean,
  bill: boolean,
): void => {
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
  newCustomerData.firstName = dataForm.firstName;
  newCustomerData.lastName = dataForm.lastName;
  newCustomerData.email =
    typeof dataForm.email === 'string' ? dataForm.email : '';
  newCustomerData.password =
    typeof dataForm.password === 'string' ? dataForm.password : '';
  newCustomerData.dateOfBirth =
    typeof dataForm.dateOfBirth === 'string' ? dataForm.dateOfBirth : '';
  newCustomerData.addresses = newAddress;
  if (shipp) {
    newCustomerData['defaultShippingAddress'] = 0;
  }
  if (bill) {
    newCustomerData['defaultBillingAddress'] = 0;
  }
};

const signInData = {
  email: newCustomerData.email,
  password: newCustomerData.password,
};

export const EntryDataForm = (): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const toSignInPage = useNavigate();
  const toMainPage = useNavigate();
  const onOfPoUpForm = (): void => {
    handleRegistration();
  };
  const [registrationMessage, setRegistrationMessage] = useState<string | null>(
    null,
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const handleRegistration = (): void => {
    registerNewCustomer(newCustomerData)
      .then(data => {
        setRegistrationMessage(
          `Welcome ${data.body.customer.firstName} ${data.body.customer.lastName}`,
        );
        setVisible(true);
        logIn(data);
        setShowSuccessMessage(true);
        clientSignIn(signInData).execute();
      })
      .catch(error => {
        console.warn(error);
        if (error.code === 400) {
          setRegistrationMessage(
            error.message + ' Log in or use another email address',
          );
          setVisible(true);
        } else {
          setRegistrationMessage(error.message + ' Should try again later');
          setVisible(true);
        }
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
          if (showSuccessMessage) {
            setIsAuth(true);
            toMainPage('/');
          }
        }}>
        <p className="m-1 message-for-user ">{registrationMessage}</p>
      </Dialog>
      <h4 className="center mb-2 pl-2 pr-2 text-center">
        If you have an account with our store, please go to the sign in page
      </h4>
      <Button
        className="mt-3 mb-1"
        label="Sign In"
        type="button"
        onClick={(): void => {
          toSignInPage('/signin');
        }}
      />
    </div>
  );
};
export default EntryDataForm;
