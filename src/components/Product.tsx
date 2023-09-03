import { ProductProjection } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import { covertPrice } from '../utils/product';
import styles from './Product.module.scss';

export const ProductItem = (data: ProductProjection): JSX.Element => {
  const price = data.masterVariant.prices?.[0].value.centAmount;
  const discountPrice =
    data.masterVariant.prices?.[0].discounted?.value.centAmount;

  const key = data.masterVariant.key;
  const slug = data.slug['en-US'];
  const categories = data.masterVariant.attributes?.[0].name;

  const navigate = useNavigate();

  return (
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

      <div className={discountPrice ? styles.newPrices : styles.oldPrices}>
        <div className={discountPrice ? styles.oldPrice : styles.price}>
          {price ? covertPrice(price) : '0.00'}
        </div>

        <div
          className={discountPrice ? styles.discountPrice : styles.noDiscount}>
          {discountPrice ? covertPrice(discountPrice) : ''}
        </div>
      </div>

      <div className={styles.name}>{data.name?.['en-US']}</div>
    </div>
  );
};
