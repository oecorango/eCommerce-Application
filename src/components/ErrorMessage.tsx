import { Message } from 'primereact/message';
import { err } from '../types/types';

export const ErrorMessage = (props: err): JSX.Element => {
  let err;
  if (props.name === 'email') err = props.err.email?.message;
  if (props.name === 'password') err = props.err.password?.message;
  if (props.name === 'firstName') err = props.err.firstName?.message;
  if (props.name === 'lastName') err = props.err.lastName?.message;
  if (props.name === 'dateOfBirth') err = props.err.dateOfBirth?.message;
  if (props.name === 'streetName' && props.err.address) {
    err = props.err.address[0]?.streetName?.message;
  }
  if (props.name === 'city' && props.err.address) {
    err = props.err.address[0]?.city?.message;
  }
  if (props.name === 'country' && props.err.address) {
    err = props.err.address[0]?.country?.message;
  }
  if (props.name === 'postalCode' && props.err.address) {
    err = props.err.address[0]?.postalCode?.message;
  }

  return (
    <Message
      className={(err && 'h-1rem mb-1') || 'hidden'}
      severity={'error'}
      text={err}
    />
  );
};
