import { ProductProjection } from '@commercetools/platform-sdk';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/Client';
import { ProductItem } from '../../components/Product';
import { PRODUCTS_IN_PAGE } from '../../constants/common';
import { getPageCount, getPagesArray } from '../../utils/product';
import styles from './CatalogMain.module.scss';
import { FilterByPrice } from '../../components/filterProduct';

export const CatalogMain = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentLocation = parseInt(location.search?.split('=')[1]) || 1;

  const [products, setProducts] = useState<ProductProjection[]>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(currentLocation);
  const startIndexProduct = (currentPage - 1) * PRODUCTS_IN_PAGE;
  const pagesArray = getPagesArray(totalPages);

  useEffect(() => {
    setCurrentPage(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    const allProduct = async (): Promise<void> => {
      try {
        const products = await getProducts(startIndexProduct, PRODUCTS_IN_PAGE);
        const totalCount = products.body.total;
        if (totalCount)
          setTotalPages(getPageCount(totalCount, PRODUCTS_IN_PAGE));
        setProducts(products.body.results);
      } catch (err) {
        console.error(err);
      }
    };
    allProduct();
  }, [startIndexProduct]);

  return (
    <>
      <div className={styles.content}>
        {products?.map(data => <ProductItem {...data} key={data.id} />)}
      </div>
      <div className={styles.pagination}>
        {pagesArray.map(
          (index): JSX.Element => (
            <Button
              className={
                currentPage === index
                  ? styles.paginationButtonActive
                  : styles.paginationButton
              }
              key={index}
              onClick={(): void => {
                navigate(`?page=${index}`);
              }}>
              {index}
            </Button>
          ),
        )}
      </div>
    </>
  );
};
