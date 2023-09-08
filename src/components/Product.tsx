import { ProductProjection } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import { covertPrice } from '../utils/product';
import styles from './Product.module.scss';
import {
  asyncAddItemCart,
  asynctUpdateItemCart,
  cartUserDraft,
  useIsItemInCart,
} from './Cart/useItemCart';
import { count } from '../constants/registratForm';
import { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';

export const ProductItem = (data: ProductProjection): JSX.Element => {
  const price = data.masterVariant.prices?.[0].value.centAmount;
  const discountPrice =
    data.masterVariant.prices?.[0].discounted?.value.centAmount;

  const key = data.masterVariant.key;
  const slug = data.slug['en-US'];
  const categories = data.masterVariant.attributes?.[0].name;
  const description = data.description?.['en-US'].slice(0, 50);

  const navigate = useNavigate();
  //=========
  const [checked, setChecked] = useState<boolean>(false);
  let keyProduct = '';
  const id = key;
  if (id) keyProduct = id;
  const cartIsItem = useIsItemInCart(keyProduct);
  useEffect(() => {
    setChecked(cartIsItem.IsItem);
  }, [cartIsItem.IsItem]);
  const callback = (): void => {};
  //==========
  return (
    <div>
      <div
        className={styles.products}
        onClick={(): void => {
          if (key)
            navigate(PAGES.catalog.route + `${categories}/` + slug, {
              state: key,
            });
        }}>
        <img
          src={data.masterVariant.images?.[0].url}
          alt={data.masterVariant.images?.[0].label}
        />

        <div className={styles.prices}>
          <div className={discountPrice ? styles.newPrices : styles.oldPrices}>
            <div className={discountPrice ? styles.oldPrice : styles.price}>
              {price ? covertPrice(price) : '0.00'}
            </div>

            <div
              className={
                discountPrice ? styles.discountPrice : styles.noDiscount
              }>
              {discountPrice ? covertPrice(discountPrice) : ''}
            </div>
          </div>

          <i className={`${styles.icon} pi pi-cart-plus`} />
        </div>

        <div className={styles.name}>{data.name?.['en-US']}</div>
        <p>{description}...</p>
      </div>
      <div className="card flex justify-content-center">
        <ToggleButton
          onLabel="In Cart"
          offLabel="Out Cart"
          onIcon="pi pi-check"
          offIcon="pi pi-times"
          checked={checked}
          onChange={(e: ToggleButtonChangeEvent): void => {
            setChecked(e.value);
            if (e.value) {
              asynctUpdateItemCart(count.productId, 0, callback);
            } else {
              if (count.cartID) {
                count.productItemId = data.id.trim();
                // asynctUpdateItemCart(count.productId, 1, callback);
                asyncAddItemCart(data.id.trim());
              } else {
                cartUserDraft(data.id.trim());
              }
            }
          }}
          className="mt-3 mb-1 border-round-lg"
        />
      </div>
    </div>
  );
};
