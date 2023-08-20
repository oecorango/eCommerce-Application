import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ICountriesData, IRegistrationForm } from '../../interface/interface';
import { countriesData } from '../../constants/registratForm';
import { takeDataForm } from './EntryDataForm';
import { validRegisterData } from '../../utils/validRegisterData';
import { ErrorMessage } from '../ErrorMessage';

export const RegistrationForm = (props: {
  create: () => void;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validRegisterData),
  });

  const [identicalAddresses, setIdenticalAddresses] = useState(false);

  const [selectedCountry0, setSelectedCountry0] =
    useState<ICountriesData | null>(null);
  const [selectedCountry1, setSelectedCountry1] =
    useState<ICountriesData | null>(null);
  const countries: ICountriesData[] = countriesData;
  const [checkedShip, setCheckedShip] = useState<boolean>(false);
  const [checkedBill, setCheckedBill] = useState<boolean>(false);

  const onSubmit = (data: IRegistrationForm): void => {
    console.log(data);
    takeDataForm(data, checkedShip, checkedBill, identicalAddresses);
    props.create();
  };

  return (
    <div className="registration__page">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
        <InputText
          className="mb-1"
          {...register('email')}
          type="text"
          placeholder="Enter your email"
        />
        <ErrorMessage err={errors} name={'email'} />

        <InputText
          className="mb-1"
          {...register('password')}
          type="password"
          placeholder="Enter your password"
          autoComplete="on"
        />
        <ErrorMessage err={errors} name={'password'} />

        <InputText
          className="mb-1"
          {...register('firstName')}
          placeholder="Enter your FirstName"
        />
        <ErrorMessage err={errors} name={'firstName'} />

        <InputText
          className="mb-1"
          {...register('lastName')}
          placeholder="Enter your LastName"
        />
        <ErrorMessage err={errors} name={'lastName'} />

        <label className="registration_span mb-1 mt-1">Enter your age</label>
        <InputText
          className="mb-1"
          type={'date'}
          {...register('dateOfBirth', {
            valueAsDate: true,
          })}
        />
        <ErrorMessage err={errors} name={'dateOfBirth'} />

        <div className="flex mt-2">
          <InputSwitch
            className="w-2"
            checked={identicalAddresses}
            onChange={(e): void => setIdenticalAddresses(e.value === true)}
          />
          <p className="pl-2">
            Click if your billing and shipping addresses match
          </p>
        </div>

        <div className="registration_address">
          <label htmlFor="serial" className="registration_span">
            Shipping Address
          </label>
          <InputText
            className="mb-1"
            {...register('address.0.streetName')}
            placeholder="Enter your street"
          />
          <ErrorMessage err={errors} name={'streetName'} />

          <InputText
            className="mb-1"
            {...register('address.0.city')}
            placeholder="Enter your city"
          />
          <ErrorMessage err={errors} name={'city'} />

          <div className="w-full mb-1">
            <Dropdown
              className="w-full"
              {...register('address.0.country')}
              onChange={(e: DropdownChangeEvent): void => {
                setSelectedCountry0(e.value);
              }}
              value={selectedCountry0}
              options={countries}
              optionLabel="name"
              placeholder="Select your Country"
            />
            <ErrorMessage err={errors} name={'country'} />
          </div>

          <InputText
            className="mb-1"
            {...register('address.0.postalCode')}
            placeholder="Enter your Post-Code"
          />
          <ErrorMessage err={errors} name={'postalCode'} />

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
            <div
              className="card flex justify-content-center"
              style={{
                width: '120px',
              }}>
              <ToggleButton
                onLabel="default"
                offLabel="reject"
                onIcon="pi pi-check"
                offIcon="pi pi-times"
                checked={checkedShip}
                onChange={(e: ToggleButtonChangeEvent): void =>
                  setCheckedShip(e.value)
                }
                className="w-8rem"
              />
            </div>
          </div>
        </div>

        <div className={identicalAddresses ? 'hidden' : 'registration_address'}>
          <label htmlFor="serial" className="registration_span">
            Billing Address
          </label>
          <InputText
            className="mb-1"
            {...register('address.1.streetName')}
            placeholder="Enter your street"
          />
          <ErrorMessage err={errors} name={'streetName1'} />

          <InputText
            className="mb-1"
            {...register('address.1.city')}
            placeholder="Enter your city"
          />
          <ErrorMessage err={errors} name={'city1'} />

          <div className="w-full mb-1">
            <Dropdown
              className="w-full"
              {...register('address.1.country')}
              onChange={(e: DropdownChangeEvent): void => {
                setSelectedCountry1(e.value);
              }}
              value={selectedCountry1}
              options={countries}
              optionLabel="name"
              placeholder="Select your Country"
            />
            <ErrorMessage err={errors} name={'country1'} />
          </div>

          <div className="w-full mb-1">
            <InputText
              className="mb-1"
              {...register('address.1.postalCode')}
              placeholder="Enter your Post-Code"
            />
            <ErrorMessage err={errors} name={'postalCode1'} />
          </div>
          <div className="card flex justify-content-center">
            <ToggleButton
              onLabel="default"
              offLabel="reject"
              onIcon="pi pi-check"
              offIcon="pi pi-times"
              checked={checkedBill}
              onChange={(e: ToggleButtonChangeEvent): void =>
                setCheckedBill(e.value)
              }
              className="w-8rem"
            />
          </div>
        </div>
        <Button
          className="mt-3 mb-1"
          label="Registration"
          type="submit"
          onClick={(): void => {
            if (identicalAddresses) {
              setValue('address.1.streetName', 'a');
              setValue('address.1.city', 'b');
              setValue('address.1.country', 'BY');
              setValue('address.1.postalCode', '123456');
            }
          }}
        />
      </form>
    </div>
  );
};
export default RegistrationForm;
