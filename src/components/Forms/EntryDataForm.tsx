import { useContext, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { clientSignIn, registerNewCustomer } from '../../api/Client';
import { RegistrationForm } from './RegistrationForm';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { IRegistrationForm, IAddresses } from '../../interface/interface';
import { newCustomerData } from '../../constants/registratForm';
import { AuthContext } from '../authProvider';
import { logIn } from '../../utils/utils';
import { addShippingAddress, addBillingAddress } from '../../utils/requestAPI';

let newAddress: IAddresses[] = [
  {
    country: '',
    city: '',
    postalCode: '',
    streetName: '',
  },
];
let setBilling = false;
let setShipping = false;
export const takeDataForm = (
  dataForm: IRegistrationForm,
  address0: boolean,
  address1: boolean,
  checked: boolean,
): void => {
  console.log(dataForm, address0, address1, checked);
  if (dataForm.dateOfBirth) {
    dataForm.dateOfBirth = new Date(dataForm.dateOfBirth)
      .toLocaleDateString()
      .split('.')
      .reverse()
      .join('-');
  } else {
    dataForm.dateOfBirth = '';
  }
  dataForm.address[0].country = dataForm.address[0].country
    .slice(-3)
    .slice(0, -1);
  if (checked) {
    newAddress = dataForm.address.slice(0, 1);
    if (address0) {
      newCustomerData['defaultShippingAddress'] = 0;
      newCustomerData['defaultBillingAddress'] = 0;
    }
  } else {
    dataForm.address[1].country = dataForm.address[1].country
      .slice(-3)
      .slice(0, -1);
    newAddress = dataForm.address;
    if (address0) {
      newCustomerData['defaultShippingAddress'] = 0;
    } else {
      setShipping = true;
    }
    if (address1) {
      newCustomerData['defaultBillingAddress'] = 1;
    } else {
      setBilling = true;
    }
  }
  newCustomerData.firstName = dataForm.firstName;
  newCustomerData.lastName = dataForm.lastName;
  newCustomerData.email = dataForm.email;
  newCustomerData.password = dataForm.password;
  newCustomerData.dateOfBirth = dataForm.dateOfBirth;
  newCustomerData.addresses = newAddress;
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
        if (setShipping) {
          let id = data.body.customer.addresses[0].id as string;
          addShippingAddress(
            data.body.customer.id,
            data.body.customer.version,
            id,
            setBilling,
          );
        } else {
          if (setBilling) {
            let id = data.body.customer.addresses[1].id as string;
            addBillingAddress(
              data.body.customer.id,
              data.body.customer.version,
              id,
            );
          }
        }
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
