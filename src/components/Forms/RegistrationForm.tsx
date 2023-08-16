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

let postCod: string = '_____';
let ship: boolean = false,
  bill: boolean = false;
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
  const [value, setValue] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<ICountriesData | null>(
    null,
  );
  const countries: ICountriesData[] = countriesData;
  const [checkedShip, setcheCkedShip] = useState<boolean>(false);
  const [checkedBill, setCheckedBill] = useState<boolean>(false);
  const onSubmit: SubmitHandler<IRegistrationForm> = (
    data: IRegistrationForm,
  ): void => {
    data.postalCode = value;
    takeDataForm(data, ship, bill);
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
          <InputText
            className="mb-1"
            {...register('streetName')}
            placeholder="Enter your street"
          />
          <ErrorMessage err={errors} name={'streetName'} />

          <InputText
            className="mb-1"
            {...register('city')}
            placeholder="Enter your city"
          />
          <ErrorMessage err={errors} name={'city'} />

          <div className="w-full mb-1">
            <Dropdown
              className="w-full"
              {...register('country')}
              value={selectedCountry}
              onChange={(e: DropdownChangeEvent): void => {
                setSelectedCountry(e.value);
                postCod = e.value.postalCode;
              }}
              options={countries}
              optionLabel="name"
              placeholder="Select your Country"
            />
            <ErrorMessage err={errors} name={'country'} />
          </div>

          <label htmlFor="serial" className="registration_span">
            Postcode (example = {postCod})
          </label>
          <div className="w-full mb-1">
            <InputMask
              className="w-full"
              value={value}
              onChange={(e: InputMaskChangeEvent): void => {
                if (e.target.value) {
                  setValue(e.target.value);
                }
              }}
              mask={postCod}
              placeholder={postCod}
            />
          </div>
          <label className="registration_span">Переключатель</label>
          <label className="registration_span">
            defaultShip&nbsp;&nbsp;&nbsp;defaultBill
          </label>
          <div className="registration_shipBill">
            <ToggleButton
              checked={checkedShip}
              onChange={(e: ToggleButtonChangeEvent): void => {
                setcheCkedShip(e.value);
                ship = e.value;
              }}
              className="w-8rem"
            />
            <ToggleButton
              checked={checkedBill}
              onChange={(e: ToggleButtonChangeEvent): void => {
                setCheckedBill(e.value);
                bill = e.value;
              }}
              className="w-8rem"
            />
          </div>
        </div>

        <Button className="mt-3 mb-1" label="Registration" type="submit" />
      </form>
    </div>
  );
};
export default RegistrationForm;
