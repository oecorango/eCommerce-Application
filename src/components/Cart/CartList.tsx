import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { useEffect, useState } from 'react';
import { count } from '../../constants/registratForm';
import {
  addProductCart,
  cartAll,
  cartDeleteID,
  cartDraft,
  cartID,
  changeItemQuantity,
} from '../../api/customerCart';
import styles from './CartForm.module.scss';
import { LineItem } from '@commercetools/platform-sdk';
import { useCartID } from './useCart';
import ItemsVision from './ItemsVision';
import { FIRST_INDEX } from '../../constants/common';
import CartEmpty from './CartEmpty';
import { asyncCartDeleteID } from './useItemCart';

export const cartData: LineItem[] = [];
let sumaCart = 0;
// let sumaCartSum = 0;
export default function CartList(props: { onOffForm: object }): JSX.Element {
  const [visibleCartList] = useState(props.onOffForm);
  const [itemsCart] = useState(cartData);
  const [deletItem, setDeletItem] = useState(false);
  const [sumCart, setSumCart] = useState(0);

  const itemCart = useCartID(count.cartID);
  count.versionCart = itemCart.version;
  const editData = (delet: boolean, sumaItem: number): void => {
    setDeletItem(delet);
    sumaCart = sumaItem;
  };

  useEffect(() => {
    setSumCart(itemCart.sumaCart);
    itemCart.asyncCartID();
  }, [itemCart.isLoading]);
  useEffect(() => {
    setSumCart(itemCart.sumaCart + sumaCart);
    itemCart.asyncCartID();
    setDeletItem(false);
  }, [deletItem]);
  return (
    <div className={styles.list_cart}>
      <div className={styles.cart_middle} style={visibleCartList}>
        <div className="card">
          {itemCart.response ? (
            itemCart.response.length ? (
              <div className={styles.cart_small_row}>
                <ScrollPanel style={{ width: '70%', height: '270px' }}>
                  <div className="mb-5">
                    {itemsCart.map(items => (
                      <div className={styles.list_cart_white} key={items.id}>
                        <ItemsVision
                          value={{
                            name: items.name['en-US'],
                            id: items.id,
                            price: items.price.value.centAmount,
                            count: items.quantity,
                            version: itemCart.version,
                            img: items.variant.images
                              ? items.variant.images?.[FIRST_INDEX].url
                              : '',
                          }}
                          editDataCart={editData}
                        />
                      </div>
                    ))}
                  </div>
                </ScrollPanel>
                <div className={styles.list_cart_white}>
                  <p className={styles.cart_span}>Data Cart</p>
                  <p className={styles.cart_span}>
                    Suma:&nbsp;
                    <span className="cart_span" style={{ color: 'red' }}>
                      {(sumCart / 100).toFixed(2)}
                    </span>
                  </p>
                  <Button
                    className="mt-3 mb-1 border-round-lg"
                    label="Delete all product"
                    type="submit"
                    onClick={(): void => {
                      asyncCartDeleteID(editData);
                      count.cartID = '';
                      count.versionCart = 1;
                    }}
                  />
                </div>
              </div>
            ) : (
              <CartEmpty />
            )
          ) : (
            <CartEmpty />
          )}
        </div>
      </div>

      <Button
        label="Testing Cart"
        className="mt-3 mb-1"
        onClick={(): void => {
          //=====================Запуск запросов для проверок и корректировок=========
          // itemCart.asyncCartID();
          //=====================cartDraft
          // (async (): Promise<void> => {
          //   await cartDraft()
          //     .then(({ body }) => {
          //       console.log(body);
          //     })
          //     .catch(console.error);
          // })();
          //==============getProductsForId
          // (async (): Promise<void> => {
          //   await getProductsForId()
          //     .then(({ body }) => {
          //       console.log(body);
          //     })
          //     .catch(console.error);
          // })();
          //==============cartID
          // (async (): Promise<void> => {
          //   await cartID(count.cartID)
          //     .then(({ body }) => {
          //       console.log(body.lineItems.length);
          //     })
          //     .catch(console.error);
          // })();
          //==========cartDeleteID
          // (async (): Promise<void> => {
          //   await cartDeleteID('6642a76c-4aa1-47fd-8be3-78abd4eaa7ec', 16) // версия в удаляемой корзине
          //     .then(({ body }) => {
          //       console.log(body);
          //       console.log('444444');
          //     })
          //     .catch(console.error);
          // })();

          //=========================addProductCart
          // const action: CartAddLineItemAction[] = [
          //   {
          //     action: 'addLineItem',
          //     productId: 'acb55a35-f0d8-4658-a6ad-6af41772a366',
          //     quantity: 1,
          //   },
          // ];
          // (async (): Promise<void> => {
          //   await addProductCart(
          //     'd6d734ce-465d-4174-8236-493f7e872176',
          //     10,
          //     action,
          //   )
          //     .then(({ body }) => {
          //       console.log(body);
          //     })
          //     .catch(console.error);
          // })();
          //=========================Change LineItem Quantity  changeItemQuantity
          // const action: CartUpdateAction[] = [
          //   {
          //     action: 'changeLineItemQuantity',
          //     lineItemId: 'aa24f2e2-9a84-47bb-a1b0-3f1e88ce6df9',
          //     quantity: 7,
          //   },
          // ];
          // (async (): Promise<void> => {
          //   await changeItemQuantity(
          //     'd6d734ce-465d-4174-8236-493f7e872176',
          //     15,
          //     action,
          //   )
          //     .then(({ body }) => {
          //       console.log(body);
          //       сartAll.asyncCartAll();
          //     })
          //     .catch(console.error);
          // })();
          //==============cartAll
          (async (): Promise<void> => {
            await cartAll()
              .then(({ body }) => {
                console.log(body.results);
              })
              .catch(console.error);
          })();
        }}
      />
    </div>
  );
}
