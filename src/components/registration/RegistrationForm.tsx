import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputMask, InputMaskChangeEvent } from 'primereact/inputmask';
import { ICountriesData, IRegistrationForm } from '../../interface/interface';
import { countriesData } from '../../constants/registratForm';
import { ErrorRegistr } from './ErrorRegistr';
import './_registration.scss';
import { takeDataForm } from './EntryDataForm';

let postCod: string = '_____';

export const RegistrationForm = (props: {
  create: () => void;
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRegistrationForm>({
    mode: 'onBlur',
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
    <div className="registration__page content">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column">
        <label className="registration_span">Email</label>
        <InputText
          className="mb-1"
          {...register('email', {
            value: 'gg25ggg@mail.ru',
            required: 'Required to fill',
            minLength: {
              value: 5,
              message: 'Minimum 5 characters',
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Incorrect email',
            },
          })}
          type="text"
          placeholder="Enter your email"
        />
        <Message
          className={
            ((errors?.email?.message as string) && 'h-1rem') || 'hidden'
          }
          severity={'error'}
          text={errors?.email?.message as string}
        />
        {/* {errors?.email && <ErrorRegistr message={errors.email.message} />} */}
        <label className="registration_span">Password</label>
        <InputText
          className="mb-1"
          {...register('password', {
            value: 'gAggg99999',
            required: 'Required to fill',
            minLength: {
              value: 4,
              message: 'Minimum 8 characters',
            },
            maxLength: {
              value: 20,
              message: 'Maximum 20 characters',
            },
          })}
          type="password"
          placeholder="Enter your password"
          autoComplete="on"
        />
        <Message
          className={
            ((errors?.password?.message as string) && 'h-1rem') || 'hidden'
          }
          severity={'error'}
          text={errors?.password?.message as string}
        />
        {/* {errors?.password && <ErrorRegistr message={errors.password.message} />} */}
        <label className="registration_span">Name</label>
        <InputText
          className="mb-1"
          {...register('firstName', {
            required: 'Хоть одну букву введите',
            pattern: {
              value: /^[A-Za-zА-ЯЁа-яё]+$/,
              message: 'Говорили вводим буквы',
            },
          })}
          placeholder="firstName"
        />
        {errors?.firstName && (
          <ErrorRegistr message={errors.firstName.message} />
        )}
        <label className="registration_span">lastName</label>
        <InputText
          className="mb-1"
          {...register('lastName', {
            required: 'Хоть одну букву введите',
            pattern: {
              value: /^[A-Za-zА-ЯЁа-яё]+$/,
              message: 'Говорили вводим буквы',
            },
          })}
          placeholder="lastName"
        />
        {errors?.lastName && <ErrorRegistr message={errors.lastName.message} />}
        <label className="registration_span">Date of Birth</label>
        <div>
          <InputText
            className="w-full md:w-14rem"
            type={'date'}
            {...register('dateOfBirth', {
              valueAsDate: true,
              validate: {
                volue: (value, formValues) =>
                  Date.now() - +value > 409968000000,
              },
            })}
          />
          {errors?.dateOfBirth && (
            <div style={{ color: 'red', marginBottom: 10 }}>
              Детям до 13 лет и еще не рожденным вход запрещен
            </div>
          )}
        </div>
        <label className="registration_span">Street</label>
        <InputText
          className="mb-1"
          {...register('streetName', {
            required: 'Что нибудь введите',
          })}
          placeholder="streetName"
        />
        {errors?.streetName && (
          <ErrorRegistr message={errors.streetName.message} />
        )}
        <label className="registration_span">City</label>
        <InputText
          className="mb-1"
          {...register('city', {
            required: 'Хоть одну букву введите',
            pattern: {
              value: /^[A-Za-zА-ЯЁа-яё]+$/,
              message: 'Говорили вводим буквы',
            },
          })}
          placeholder="city"
        />
        {errors?.city && <ErrorRegistr message={errors.city.message} />}
        <label className="registration_span">Countries</label>
        <div className="mb-1">
          <Dropdown
            {...register('country', {})}
            value={selectedCountry}
            onChange={(e: DropdownChangeEvent): void => {
              setSelectedCountry(e.value);
              postCod = e.value.postalCode;
            }}
            options={countries}
            optionLabel="name"
            placeholder="Select a Country"
            className="w-full md:w-14rem"
          />
        </div>

        <label htmlFor="serial" className="registration_span">
          Postcode (example = {postCod})
        </label>
        <div className="mb-1">
          <InputMask
            value={value}
            onChange={(e: InputMaskChangeEvent): void => {
              if (e.target.value) {
                setValue(e.target.value);
              }
            }}
            // disabled
            mask={postCod}
            placeholder={postCod}
          />
        </div>
        <Button
          className="mt-3 mb-1"
          label="Registration"
          type="submit"
          disabled={!isValid}
        />
      </form>
    </div>
  );
};
export default RegistrationForm;
