import { Message } from 'primereact/message';
import { err } from '../types/types';

export const ErrorMessage = (props: err): JSX.Element => {
  let err;
  if (props.name === 'email') err = props.err.email?.message;
  if (props.name === 'password') err = props.err.password?.message;
  if (props.name === 'firstName') err = props.err.firstName?.message;
  if (props.name === 'lastName') err = props.err.lastName?.message;
  if (props.name === 'dateOfBirth') err = props.err.dateOfBirth?.message;
  // if (props.name === 'streetName') err = props.err.streetName?.message;
  // if (props.name === 'city') err = props.err.city?.message;
  // if (props.name === 'country') err = props.err.country?.message;

  return (
    <Message
      className={(err && 'h-1rem mb-1') || 'hidden'}
      severity={'error'}
      text={err}
    />
  );
};
