import { useContext, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { registerNewCustomer } from '../../api/Client';
import { RegistrationForm } from './RegistrationForm';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { IRegistrationForm, IAddresses } from '../../interface/interface';
import { newCustomerData } from '../../constants/registratForm';
import { AuthContext } from '../authProvider';
import { logIn } from '../../utils/user';
import { customerShippingBilling } from '../../utils/requestAPI';
import styles from './EntryDataForm.module.scss';

let newAddress: IAddresses[] = [
  {
    country: '',
    city: '',
    postalCode: '',
    streetName: '',
  },
];
let setBillShipp = [0, 0, 0];
export const takeDataForm = (
  dataForm: IRegistrationForm,
  address0: boolean,
  address1: boolean,
  checked: boolean,
): void => {
  delete newCustomerData.defaultShippingAddress;
  delete newCustomerData.defaultBillingAddress;
  if (dataForm.dateOfBirth) {
    const userAge = new Date(dataForm.dateOfBirth);
    const userYear = userAge.getFullYear();
    const userMonth = userAge.getMonth() + 1;
    const userDate = userAge.getDate() + 1;
    // console.log(userDate);
    dataForm.dateOfBirth = `${userYear}-${userMonth}-${userDate}`;
    // dataForm.dateOfBirth = new Date(dataForm.dateOfBirth)
    //   .toLocaleDateString()
    //   .split('.')
    //   .reverse()
    //   .join('-');
  } else {
    dataForm.dateOfBirth = '';
  }

  dataForm.address[0].country = dataForm.address[0].country
    .slice(-3)
    .slice(0, -1);
  if (checked) {
    newAddress = dataForm.address.slice(0, 1);
    if (address0) {
      if (address1) {
        newCustomerData['defaultShippingAddress'] = 0;
        newCustomerData['defaultBillingAddress'] = 0;
        setBillShipp = [0, 0, 0];
      } else {
        newCustomerData['defaultShippingAddress'] = 0;
        setBillShipp = [0, 1, 0];
      }
    } else {
      if (address1) {
        newCustomerData['defaultBillingAddress'] = 0;
        setBillShipp = [1, 0, 0];
      } else {
        setBillShipp = [1, 1, 0];
      }
    }
  } else {
    dataForm.address[1].country = dataForm.address[1].country
      .slice(-3)
      .slice(0, -1);
    newAddress = dataForm.address;
    if (address0) {
      newCustomerData['defaultShippingAddress'] = 0;
      setBillShipp = [0, 0, 1];
    } else {
      setBillShipp = [1, 0, 1];
    }
    if (address1) {
      newCustomerData['defaultBillingAddress'] = 1;
      setBillShipp[2] = 0;
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
        if (setBillShipp.includes(1)) {
          let id01 = data.body.customer.addresses[0].id as string;
          let id02 =
            setBillShipp[2] === 1
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
