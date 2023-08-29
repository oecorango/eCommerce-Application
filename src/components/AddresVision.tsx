import { IpropsAddres } from '../types/interface';
import styles from './Forms/AddressForm.module.scss';

export default function AddresVision(props: IpropsAddres): JSX.Element {
  return (
    <div>
      <p style={{ margin: '0.3rem' }}>
        Street:&nbsp;
        <span className="registration_span" style={{ color: 'red' }}>
          {props.value.streetName}
        </span>
      </p>
      <p style={{ margin: '0.3rem' }}>
        City:&nbsp;
        <span className="registration_span" style={{ color: 'red' }}>
          {props.value.city}
        </span>
      </p>
      <p style={{ margin: '0.3rem' }}>
        Country:&nbsp;
        <span className="registration_span" style={{ color: 'red' }}>
          {props.value.country}
        </span>
      </p>
      <p style={{ margin: '0.3rem' }}>
        Postcode:&nbsp;
        <span className="registration_span" style={{ color: 'red' }}>
          {props.value.postalCode}
        </span>
      </p>
      <div className={styles.list_address} style={{ padding: '0rem' }}></div>
    </div>
  );
}
