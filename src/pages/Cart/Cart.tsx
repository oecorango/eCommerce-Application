import CartList from '../../components/Cart/CartList';

export const CartPage = (): JSX.Element => {
  return (
    <div className="content">
      <h1>Cart</h1>
      <p>Cart</p>
      <div className="content">
        <CartList onOffForm={{ display: 'block' }} />
      </div>
      <div className="content">
        <CartList onOffForm={{ display: 'none' }} />
      </div>
    </div>
  );
};
