import { ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { getProducts } from '../../api/Client';
import { ProductItem } from '../../components/Product';
import styles from './MainPage.module.scss';
import { POPULAR_PRODUCTS_IN_PAGE } from '../../constants/common';
import { indexRandomProducts } from '../../utils/product';
import { Aside } from '../../components/Aside';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../../constants/pages';

export const MainPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductProjection[]>();
  useEffect(() => {
    allProduct();
  }, []);

  const allProduct = async (): Promise<void> => {
    const products = await getProducts();
    const totalCount = products.body.total;
    if (totalCount) {
      const index = indexRandomProducts(totalCount);
      const randomProducts = await getProducts(index, POPULAR_PRODUCTS_IN_PAGE);
      setProducts(randomProducts.body.results);
    }
  };

  return (
    <>
      <div className={styles.page}>
        <Aside />
        <div className={styles.page__content}>
          <div className={styles.page__header}>
            <p>The best items</p>
            <p>&nbsp; for your bath</p>
          </div>
          {/* @ToDo сделать слайдер для категорий*/}
          <div className={styles.category}>
            <div
              className={styles.accessories}
              onClick={(): void => navigate(PAGES.catalog.route)}>
              Catalog
            </div>
            <div className={styles.accessories}>ACCESSORIES</div>
            <div className={styles.cosmetics}>COSMETICS</div>
            <div className={styles.textiles}>TEXTILES</div>
            <div className={styles.sets}>GIFT SETS</div>
          </div>
          <p className={styles.text}>Popular items in our store</p>
          <div className={styles.content}>
            {products?.map(data => <ProductItem {...data} key={data.id} />)}
          </div>
        </div>
      </div>
    </>
  );
};
