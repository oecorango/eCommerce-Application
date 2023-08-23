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
import { validRegisterData } from './utils/validRegisterData';
import { ErrorMessage } from '../ErrorMessage';
import { Checkbox } from 'primereact/checkbox';

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
  const [checkedPassword, setCheckedPassword] = useState(false);

  const [selectedCountry0, setSelectedCountry0] =
    useState<ICountriesData | null>(null);
  const [selectedCountry1, setSelectedCountry1] =
    useState<ICountriesData | null>(null);
  const countries: ICountriesData[] = countriesData;
  const [checkedShip, setCheckedShip] = useState<boolean>(false);
  const [checkedBill, setCheckedBill] = useState<boolean>(false);

  const onSubmit = (data: IRegistrationForm): void => {
    takeDataForm(data, checkedShip, checkedBill, identicalAddresses);
    props.create();
  };

  return (
    <div className="registration__page">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
        <InputText
          className="mb-1 border-round-lg"
          {...register('email')}
          type="text"
          placeholder="Enter your email"
        />
        <ErrorMessage err={errors} name={'email'} />

        <div className="p-inputgroup">
          <InputText
            className="mb-1"
            style={{
              borderTopLeftRadius: '0.5rem',
              borderBottomLeftRadius: '0.5rem',
            }}
            {...register('password')}
            type={!checkedPassword ? 'password' : 'text'}
            placeholder="Enter your password"
            autoComplete="on"
          />
          <span
            className="p-inputgroup-addon mb-1"
            style={{
              borderTopRightRadius: '0.5rem',
              borderBottomRightRadius: '0.5rem',
            }}>
            <Checkbox
              checked={checkedPassword}
              onChange={(): void => setCheckedPassword(!checkedPassword)}
            />
          </span>
        </div>
        <ErrorMessage err={errors} name={'password'} />

        <InputText
          className="mb-1 border-round-lg"
          {...register('firstName')}
          placeholder="Enter your FirstName"
        />
        <ErrorMessage err={errors} name={'firstName'} />

        <InputText
          className="mb-1 border-round-lg"
          {...register('lastName')}
          placeholder="Enter your LastName"
        />
        <ErrorMessage err={errors} name={'lastName'} />

        <label
          className="registration_span mb-1 mt-1"
          style={{ color: '#7b6544' }}>
          Enter your age
        </label>
        <InputText
          className="mb-1 border-round-lg"
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
          <p
            className="pl-2 mp-2 mb-2"
            style={{ color: '#7b6544', fontWeight: '700' }}>
            Click if your billing and shipping addresses match
          </p>
        </div>

        <div className="registration_address">
          <label
            htmlFor="serial"
            className="registration_span"
            style={{ color: '#7b6544' }}>
            Shipping Address
          </label>
          <InputText
            className="mb-1 w-full border-round-lg"
            {...register('address.0.streetName')}
            placeholder="Enter your street"
          />
          <ErrorMessage err={errors} name={'streetName'} />

          <InputText
            className="mb-1 w-full border-round-lg"
            {...register('address.0.city')}
            placeholder="Enter your city"
          />
          <ErrorMessage err={errors} name={'city'} />

          <div className="mb-1 w-full">
            <Dropdown
              className="w-full border-round-lg"
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
            className="mb-1 w-full border-round-lg"
            {...register('address.0.postalCode')}
            placeholder="Enter your Post-Code"
          />
          <ErrorMessage err={errors} name={'postalCode'} />

          <ToggleButton
            onLabel="Default address"
            offLabel="Default address"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            checked={checkedShip}
            onChange={(e: ToggleButtonChangeEvent): void =>
              setCheckedShip(e.value)
            }
            className="w-14rem mb-1 mt-1 border-round-lg"
          />
        </div>

        <div className={identicalAddresses ? 'hidden' : 'registration_address'}>
          <label
            htmlFor="serial"
            className="registration_span"
            style={{ color: '#7b6544' }}>
            Billing Address
          </label>
          <InputText
            className="mb-1 w-full border-round-lg"
            {...register('address.1.streetName')}
            placeholder="Enter your street"
          />
          <ErrorMessage err={errors} name={'streetName1'} />

          <InputText
            className="mb-1 w-full border-round-lg"
            {...register('address.1.city')}
            placeholder="Enter your city"
          />
          <ErrorMessage err={errors} name={'city1'} />

          <div className="w-full mb-1">
            <Dropdown
              className="w-full border-round-lg"
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
              className="mb-1 w-full border-round-lg"
              {...register('address.1.postalCode')}
              placeholder="Enter your Post-Code"
            />
            <ErrorMessage err={errors} name={'postalCode1'} />
          </div>

          <ToggleButton
            onLabel="Default address"
            offLabel="Default address"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            checked={checkedBill}
            onChange={(e: ToggleButtonChangeEvent): void =>
              setCheckedBill(e.value)
            }
            className="w-14rem mb-1 mt-1 border-round-lg"
          />
        </div>
        <Button
          className="mt-3 mb-1 border-round-lg"
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
