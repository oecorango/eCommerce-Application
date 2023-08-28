import { ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { getProducts } from '../../api/Client';
import { ProductItem } from '../../components/Product';
import styles from './MainPage.module.scss';
import { Button } from 'primereact/button';
import { PRODUCTS_IN_PAGE } from '../../constants/common';
import { getPageCount, getPagesArray } from '../../utils/product';

export const MainPage = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProjection[]>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pagesArr = getPagesArray(totalPages);
  const startIndexProduct = currentPage * PRODUCTS_IN_PAGE - PRODUCTS_IN_PAGE;

  const changePage = (page: number): void => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const allProduct = async (): Promise<void> => {
      const products = await getProducts(startIndexProduct, PRODUCTS_IN_PAGE);
      const totalCount = products.body.total;
      if (totalCount) setTotalPages(getPageCount(totalCount, PRODUCTS_IN_PAGE));
      setProducts(products.body.results);
    };
    allProduct();
  }, [startIndexProduct]);

  return (
    <>
      <div className={styles.content}>
        {products?.map(data => <ProductItem {...data} key={data.id} />)}
      </div>
      <div className={styles.pagination}>
        {pagesArr.map(
          (index): JSX.Element => (
            <Button
              className={
                currentPage === index
                  ? styles.paginationButtonActive
                  : styles.paginationButton
              }
              key={index}
              onClick={(): void => changePage(index)}>
              {index}
            </Button>
          ),
        )}
      </div>
    </>
  );
};
