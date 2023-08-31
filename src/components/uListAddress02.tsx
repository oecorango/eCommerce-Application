import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { useState } from 'react';
import { IAddress } from '../types/interface';
import { newAddres, count } from '../constants/registratForm';
import { deledeAddressID, setDefault } from '../api/requestAddress';
import { getCustomerID } from '../api/Client';
import AddresVision from './AddresVision';
import AddressForm from './Forms/AddressForm';
import styles from './Forms/AddressForm.module.scss';
import { updateUserData } from './Forms/utils/updateUserData';

const id = localStorage.getItem('id');
if (id) count.ID = id;
let switchToDo = '';
let addressForForm: IAddress = newAddres[0];
export default function ListAddress(): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleAddresForm, setVisibleAddresForm] = useState(false);
  const [allAdress, setAdress] = useState(newAddres);
  const [getDefoltShip, setDefoltShip] = useState<string>('');
  const [getDefoltBill, setDefoltBill] = useState<string>('');

  const renderForm = (): void => {
    (async (): Promise<void> => {
      await getCustomerID(count.ID)
        .then(({ body }) => {
          updateUserData(body);
        })
        .catch(console.error);
      if (switchToDo === 'Add' || switchToDo === 'Edit') {
        setVisibleAddresForm(false);
      } else {
        if (switchToDo === 'DefoltStart') {
          setDefoltShip(count.defaultShipping);
          setDefoltBill(count.defaultBilling);
        }
      }
      switchToDo = '';
      setAdress([...newAddres]);
    })();
  };

  return (
    <div className="card flex justify-content-center">
      <Button
        label="Show your addresses"
        icon="pi pi-external-link"
        onClick={(): void => {
          switchToDo = 'DefoltStart';
          renderForm();
          setVisible(true);
        }}
      />
      <Dialog
        header="My addresses"
        visible={visible}
        style={{ maxWidth: '80vw' }}
        onHide={(): void => {
          count.defaultShipping = getDefoltShip;
          count.defaultBilling = getDefoltBill;
          setDefault(getDefoltShip, getDefoltBill);
          setVisible(false);
        }}>
        <div className="mb-5">
          {allAdress.map((adress, i) => (
            <div className={styles.list_address} key={adress.id}>
              <AddresVision
                value={{
                  country: adress.country,
                  city: adress.city,
                  postalCode: adress.postalCode,
                  streetName: adress.streetName,
                  id: adress.id,
                }}
                toDo={''}
                closeForm={renderForm}
              />
              <div className="flex align-items-center">
                <RadioButton
                  inputId="getDefoltShip"
                  name="Ship"
                  value={adress.id}
                  onChange={(e): void => {
                    setDefoltShip(e.value);
                  }}
                  checked={getDefoltShip === adress.id}
                />
                <label className="ml-2">defolt Shipp&nbsp;&nbsp;</label>
                <RadioButton
                  inputId="getDefoltBill"
                  name="Bill"
                  value={adress.id}
                  onChange={(e): void => {
                    setDefoltBill(e.value);
                  }}
                  checked={getDefoltBill === adress.id}
                />
                <label className="ml-2">defolt Bill</label>
              </div>
              <Button
                severity="danger"
                className="mt-3 mb-1"
                label="Delete"
                onClick={(): void => {
                  switchToDo = 'Delete';
                  deledeAddressID(adress.id, renderForm);
                }}
              />
              <label className="ml-2">&nbsp;&nbsp;</label>
              <Button
                className="mt-3 mb-1"
                label="Edit"
                onClick={(): void => {
                  addressForForm = newAddres[i];
                  switchToDo = 'Edit';
                  setVisibleAddresForm(true);
                }}
              />
            </div>
          ))}
        </div>
        <div className="mb-5">
          <Dialog
            // header="Enter address"
            visible={visibleAddresForm}
            style={{ maxWidth: '74vw' }}
            onHide={(): void => setVisibleAddresForm(false)}>
            <AddressForm
              value={addressForForm}
              toDo={switchToDo}
              closeForm={renderForm}
            />
          </Dialog>
          <Button
            className="mt-3 mb-1"
            label="New Address"
            onClick={(): void => {
              addressForForm = {
                country: '',
                city: '',
                id: '',
                postalCode: '',
                streetName: '',
              };
              switchToDo = 'Add';
              setVisibleAddresForm(true);
            }}
          />
        </div>
      </Dialog>
    </div>
  );
}
