import { ProductProjection } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import { DisplayProductInfo } from './DisplayProductInfo/DisplayProductInfo';
import styles from './Product.module.scss';

// const AccessoriesID = '059dc4ff-dab0-4723-bc77-4be94226adb5';
// const TextilesID = 'c2788add-fc7f-449d-9119-90734f995c2a';
// const CosmeticsID = 'de4d113c-211b-439d-9771-dadd0e7b9928';

export const ProductItem = (data: ProductProjection): JSX.Element => {
  const price = data.masterVariant.prices?.[0].value.centAmount.toString(); // вынести в функции
  const humanPrice = `${price?.slice(0, price.length - 2)}.${price?.slice(-2)}`; // вынести в функции
  const key = data.masterVariant.key; // надо типизировать запросы

  const toProductPage = useNavigate();

  return (
    <div
      className={styles.products}
      onClick={(): void => {
        if (key) toProductPage(PAGES.about.route, { state: key }); //поменять потом пути на страницу продукта
      }}>
      <img
        src={data.masterVariant.images?.[0].url}
        alt={data.masterVariant.images?.[0].label}
      />
      <div className={styles.prices}>{humanPrice}$</div>
      <div className={styles.name}>{data.name?.['en-US']}</div>
    </div>
  );
};
