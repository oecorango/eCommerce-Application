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
  if (props.name === 'streetName1' && props.err.address) {
    err = props.err.address[1]?.streetName?.message;
  }
  if (props.name === 'city' && props.err.address) {
    err = props.err.address[0]?.city?.message;
  }
  if (props.name === 'city1' && props.err.address) {
    err = props.err.address[1]?.city?.message;
  }
  if (props.name === 'country' && props.err.address) {
    err = props.err.address[0]?.country?.message;
  }
  if (props.name === 'country1' && props.err.address) {
    err = props.err.address[1]?.country?.message;
  }
  if (props.name === 'postalCode' && props.err.address) {
    err = props.err.address[0]?.postalCode?.message;
  }
  if (props.name === 'postalCode1' && props.err.address) {
    err = props.err.address[1]?.postalCode?.message;
  }

  return (
    <Message
      className={(err && 'h-2rem mb-1 w-full border-round-md') || 'hidden'}
      severity={'error'}
      text={err}
    />
  );
};
