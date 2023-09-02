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
} from '../../api/Client';

import styles from './CartForm.module.scss';
import {
  CartAddLineItemAction,
  CartUpdateAction,
  LineItem,
} from '@commercetools/platform-sdk';
import { useCartAll, useCartID } from './useCart';
import ItemsVision from './ItemsVision';
import { FIRST_INDEX } from '../../constants/common';
import CartEmpty from './CartEmpty';

const id = localStorage.getItem('id');
if (id) count.ID = id;

export const cartData: LineItem[] = [];
// onOffForm
export default function CartList(props: { onOffForm: object }): JSX.Element {
  const [visibleCartList, setVisibleCartList] = useState(props.onOffForm);
  const [itemsCart, setItemsCart] = useState(cartData);

  const itemCart = useCartID('d6d734ce-465d-4174-8236-493f7e872176');
  const сartAll = useCartAll();
  count.versionCart = itemCart.version;
  //d6d734ce-465d-4174-8236-493f7e872176 = 2
  //39dbbf56-b31e-44a5-865a-e5e73541ac3d = 0
  useEffect(() => {
    itemCart.asyncCartID();
  }, [itemCart.isLoading]);

  return (
    <div className={styles.list_cart}>
      <div className={styles.cart_middle} style={visibleCartList}>
        <div className="card">
          {itemCart.response.length ? (
            <div className={styles.cart_middle_row}>
              <ScrollPanel style={{ width: '100%', height: '270px' }}>
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
                      />
                      {/* <div>{items.quantity}</div> */}
                    </div>
                  ))}
                </div>
              </ScrollPanel>
              <div className={styles.list_cart_white}>
                Данные и кнопки по корзине в целом
              </div>
            </div>
          ) : (
            <CartEmpty />
          )}
        </div>
      </div>

      <Button
        label="Edit and Add addresses"
        className="mt-3 mb-1"
        onClick={(): void => {
          // itemCart.asyncCartID();
          //=====================cartDraft
          // (async (): Promise<void> => {
          //   await cartDraft(count.ID)
          //     .then(({ body }) => {
          //       console.log(body);
          //     })
          //     .catch(console.error);
          // })();
          //==============cartID
          // (async (): Promise<void> => {
          //   await cartID('41e3c7d6-70c9-4c29-9315-71679e9f8214')
          //     .then(({ body }) => {
          //       console.log(body);
          //     })
          //     .catch(console.error);
          // })();
          //==========cartDeleteID
          // (async (): Promise<void> => {
          //   await cartDeleteID('af530345-7921-4cd2-a402-1908fbac4637', 1) // версия в удаляемой корзине
          //     .then(({ body }) => {
          //       console.log(body);
          //       сartAll.asyncCartAll();
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
          const action: CartUpdateAction[] = [
            {
              action: 'changeLineItemQuantity',
              lineItemId: 'aa24f2e2-9a84-47bb-a1b0-3f1e88ce6df9',
              quantity: 7,
            },
          ];
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
                console.log(body);
              })
              .catch(console.error);
          })();
        }}
      />
    </div>
  );
}
// {
//   action: 'addLineItem',
//   productId: '{{product-id}}',
//   variantId: 2,
//   quantity: 1,
//   supplyChannel: {
//     typeId: 'channel',
//     id: '{{channel-id}}',
//   },
//   distributionChannel: {
//     typeId: 'channel',
//     id: '{{channel-id}}',
//   },
//   externalTaxRate: {
//     name: 'StandardExternalTaxRate',
//     amount: 0.19,
//     country: 'DE',
//     state: 'Bavaria',
//   },
//   shippingDetails: {
//     targets: [
//       {
//         addressKey: 'AddressKeyStringFromAddress',
//         quantity: 2,
//       },
//     ],
//   },
// }
