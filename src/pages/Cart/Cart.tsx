// import CartList from '../../components/Cart/CartList';
import styles from './Cart.module.scss';

export const CartPage = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <h1>Cart</h1>
      {/* <div className="content">
        <CartList onOffForm={{ display: 'block' }} />
      </div>
      <div className="content">
        <CartList onOffForm={{ display: 'none' }} />
      </div> */}
    </div>
  );
};
