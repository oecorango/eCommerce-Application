import CartList from '../../components/Cart/CartList';
import styles from './Cart.module.scss';

export const CartPage = (): JSX.Element => {
  return (
    <div className="content">
      {/* <h1>Cart</h1> */}
      {/* <p>Cart</p> */}
      <div className="content">
        <CartList onOffForm={{ display: 'block' }} />
      </div>
    </div>
  );
};
