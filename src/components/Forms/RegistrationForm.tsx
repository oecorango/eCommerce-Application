import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputMask, InputMaskChangeEvent } from 'primereact/inputmask';
import { ICountriesData, IRegistrationForm } from '../../interface/interface';
import { countriesData } from '../../constants/registratForm';
import { takeDataForm } from './EntryDataForm';
import { validRegisterData } from '../../utils/validRegisterData';
import { ErrorMessage } from '../ErrorMessage';

let postCod0: string = '';
let postCod1: string = '';
let address0: boolean = false,
  address1: boolean = false;
export const RegistrationForm = (props: {
  create: () => void;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>({
    mode: 'onBlur',
    resolver: yupResolver(validRegisterData),
  });
  const [value0, setValue0] = useState<string>('');
  const [value1, setValue1] = useState<string>('');
  const [selectedCountry0, setSelectedCountry0] =
    useState<ICountriesData | null>(null);
  const [selectedCountry1, setSelectedCountry1] =
    useState<ICountriesData | null>(null);
  const countries: ICountriesData[] = countriesData;
  const [checkedShip, setcheCkedShip] = useState<boolean>(false);
  const [checkedBill, setCheckedBill] = useState<boolean>(false);
  const onSubmit: SubmitHandler<IRegistrationForm> = (
    data: IRegistrationForm,
  ): void => {
    data.address[0].postalCode = value0;
    data.address[1].postalCode = value1;
    takeDataForm(data, address0, address1);
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

        <div className="registration_adress">
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
              value={selectedCountry0}
              onChange={(e: DropdownChangeEvent): void => {
                setSelectedCountry0(e.value);
                postCod0 = e.value.postalCode;
              }}
              options={countries}
              optionLabel="name"
              placeholder="Select your Country"
            />
            <ErrorMessage err={errors} name={'country'} />
          </div>

          <label htmlFor="serial" className="registration_span">
            Postcode (example = {postCod0})
          </label>
          <div className="w-full mb-1">
            <InputMask
              className="w-full"
              {...register('address.0.postalCode')}
              value={value0}
              onChange={(e: InputMaskChangeEvent): void => {
                if (e.target.value) {
                  setValue0(e.target.value);
                }
              }}
              mask={postCod0}
              placeholder={postCod0}
            />
            <ErrorMessage err={errors} name={'postalCode'} />
          </div>
          <label className="registration_span">
            Set for this address default Shipping and default Billing
          </label>
          <ToggleButton
            checked={checkedShip}
            onChange={(e: ToggleButtonChangeEvent): void => {
              setcheCkedShip(e.value);
              address0 = e.value;
            }}
            className="w-8rem"
          />
        </div>
        <div className="registration_adress">
          <label htmlFor="serial" className="registration_span">
            Billing Address
          </label>
          <InputText
            className="mb-1"
            {...register('address.1.streetName')}
            placeholder="Enter your street"
          />
          <ErrorMessage err={errors} name={'streetName'} />

          <InputText
            className="mb-1"
            {...register('address.1.city')}
            placeholder="Enter your city"
          />
          <ErrorMessage err={errors} name={'city'} />

          <div className="w-full mb-1">
            <Dropdown
              className="w-full"
              {...register('address.1.country')}
              value={selectedCountry1}
              onChange={(e: DropdownChangeEvent): void => {
                setSelectedCountry1(e.value);
                postCod1 = e.value.postalCode;
              }}
              options={countries}
              optionLabel="name"
              placeholder="Select your Country"
            />
            <ErrorMessage err={errors} name={'country'} />
          </div>

          <label htmlFor="serial" className="registration_span">
            Postcode (example = {postCod1})
          </label>
          <div className="w-full mb-1">
            <InputMask
              className="w-full"
              value={value1}
              onChange={(e: InputMaskChangeEvent): void => {
                if (e.target.value) {
                  setValue1(e.target.value);
                }
              }}
              mask={postCod1}
              placeholder={postCod1}
            />
          </div>
          <label className="registration_span">
            Set for this address default Shipping and default Billing
          </label>
          <ToggleButton
            checked={checkedBill}
            onChange={(e: ToggleButtonChangeEvent): void => {
              setCheckedBill(e.value);
              address1 = e.value;
            }}
            className="w-8rem"
          />
        </div>
        <Button className="mt-3 mb-1" label="Registration" type="submit" />
      </form>
    </div>
  );
};
export default RegistrationForm;
