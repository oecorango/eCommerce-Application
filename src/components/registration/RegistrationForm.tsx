import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputMask, InputMaskChangeEvent } from 'primereact/inputmask';
import { ICountriesData, IRegistrationForm } from '../../interface/interface';
import { countriesData } from '../../constants/registratForm';
import { takeDataForm } from './EntryDataForm';
import { validSchema1 } from '../../utils/validSchema';

let postCod: string = '_____';

export const RegistrationForm = (props: {
  create: () => void;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>({
    mode: 'onBlur',
    resolver: yupResolver(validSchema1),
  });
  const [value, setValue] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<ICountriesData | null>(
    null,
  );
  const countries: ICountriesData[] = countriesData;

  const onSubmit: SubmitHandler<IRegistrationForm> = (
    data: IRegistrationForm,
  ): void => {
    data.postalCode = value;
    takeDataForm(data);
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
        <Message
          className={(errors?.email?.message && 'h-1rem mb-1') || 'hidden'}
          severity={'error'}
          text={errors?.email?.message}
        />

        <InputText
          className="mb-1"
          {...register('password')}
          type="password"
          placeholder="Enter your password"
          autoComplete="on"
        />
        <Message
          className={(errors?.password?.message && 'h-1rem mb-1') || 'hidden'}
          severity={'error'}
          text={errors?.password?.message}
        />

        <InputText
          className="mb-1"
          {...register('firstName')}
          placeholder="Enter your FirstName"
        />
        <Message
          className={(errors?.firstName?.message && 'h-1rem mb-1') || 'hidden'}
          severity={'error'}
          text={errors?.firstName?.message}
        />

        <InputText
          className="mb-1"
          {...register('lastName')}
          placeholder="Enter your LastName"
        />
        <Message
          className={(errors?.lastName?.message && 'h-1rem mb-1') || 'hidden'}
          severity={'error'}
          text={errors?.firstName?.message}
        />

        <label className="registration_span mb-1 mt-1">Enter your age</label>
        <InputText
          className="mb-1"
          type={'date'}
          {...register('dateOfBirth', {
            valueAsDate: true,
          })}
        />
        <Message
          className={
            (errors?.dateOfBirth?.message && 'h-1rem mb-1') || 'hidden'
          }
          severity={'error'}
          text={'You must be at least 13 years old'}
        />

        <InputText
          className="mb-1"
          {...register('streetName')}
          placeholder="Enter your street"
        />
        <Message
          className={(errors?.streetName?.message && 'h-1rem mb-1') || 'hidden'}
          severity={'error'}
          text={errors?.streetName?.message}
        />

        <InputText
          className="mb-1"
          {...register('city')}
          placeholder="Enter your city"
        />
        <Message
          className={(errors?.city?.message && 'h-1rem') || 'hidden'}
          severity={'error'}
          text={errors?.city?.message}
        />

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
          <Message
            className={(errors?.country?.message && 'h-1rem mb-1') || 'hidden'}
            severity={'error'}
            text={errors?.country?.message}
          />
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

        <Button className="mt-3 mb-1" label="Registration" type="submit" />
      </form>
    </div>
  );
};
export default RegistrationForm;
