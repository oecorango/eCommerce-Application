import { IpropsItems } from '../../types/interface';
import styles from './CartForm.module.scss';
// import { count } from '../constants/registratForm';

export default function CartEmpty(): JSX.Element {
  return (
    <div className={styles.cart_emtpy}>
      <p style={{ margin: '0.3rem' }}>Cart Epty</p>
    </div>
  );
}
