import { useContext, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { registerNewCustomer } from '../../api/Client';
import { RegistrationForm } from './RegistrationForm';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { IRegistrationForm, IAddresses } from '../../types/interface';
import { newCustomerData } from '../../constants/registratForm';
import { AuthContext } from '../authProvider';
import { logIn } from '../../utils/user';
import { customerShippingBilling } from '../../api/requestAPI';
import styles from './EntryDataForm.module.scss';

let newAddress: IAddresses[] = [
  {
    country: '',
    city: '',
    postalCode: '',
    streetName: '',
  },
];
let setBillShipp = [false, false, false];
export const takeDataForm = (
  dataForm: IRegistrationForm,
  address0: boolean,
  address1: boolean,
  checked: boolean,
): void => {
  delete newCustomerData.defaultShippingAddress;
  delete newCustomerData.defaultBillingAddress;
  if (dataForm.dateOfBirth) {
    dataForm.dateOfBirth = new Date(dataForm.dateOfBirth)
      .toLocaleDateString()
      .split('.')
      .reverse()
      .join('-');
  } else {
    dataForm.dateOfBirth = '';
  }

  if (checked) {
    newAddress = dataForm.address.slice(0, 1);
    if (address0) {
      if (address1) {
        newCustomerData['defaultShippingAddress'] = 0;
        newCustomerData['defaultBillingAddress'] = 0;
        setBillShipp = [false, false, false];
      } else {
        newCustomerData['defaultShippingAddress'] = 0;
        setBillShipp = [false, true, false];
      }
    } else {
      if (address1) {
        newCustomerData['defaultBillingAddress'] = 0;
        setBillShipp = [true, false, false];
      } else {
        setBillShipp = [true, true, false];
      }
    }
  } else {
    newAddress = dataForm.address;
    if (address0) {
      newCustomerData['defaultShippingAddress'] = 0;
      setBillShipp = [false, false, true];
    } else {
      setBillShipp = [true, false, true];
    }
    if (address1) {
      newCustomerData['defaultBillingAddress'] = 1;
      setBillShipp[2] = false;
    }
  }
  newCustomerData.firstName = dataForm.firstName;
  newCustomerData.lastName = dataForm.lastName;
  newCustomerData.email = dataForm.email;
  newCustomerData.password = dataForm.password;
  newCustomerData.dateOfBirth = dataForm.dateOfBirth;
  newCustomerData.addresses = newAddress;
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
        if (setBillShipp.includes(true)) {
          let id01 = data.body.customer.addresses[0].id as string;
          let id02 = setBillShipp[2]
            ? (data.body.customer.addresses[1].id as string)
            : '';
          customerShippingBilling(
            data.body.customer.id,
            data.body.customer.version,
            { idShipp: id01, idBill: id02 },
            setBillShipp,
          );
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
    <>
      <RegistrationForm create={onOfPoUpForm} />
      <Dialog
        className={styles.module__window}
        header="Notification for you"
        visible={visible}
        onHide={(): void => {
          setVisible(false);
          if (showSuccessMessage) {
            setIsAuth(true);
            toMainPage('/');
          }
        }}>
        <p className={styles.message}>{registrationMessage}</p>
      </Dialog>
      <h4 className={styles.text}>
        If you have an account with our store, please go to the sign in page
      </h4>
      <Button
        className="mt-3 mb-1 border-round-lg"
        label="Sign In"
        type="button"
        onClick={(): void => {
          toSignInPage('/signin');
        }}
      />
    </>
  );
};
export default EntryDataForm;
