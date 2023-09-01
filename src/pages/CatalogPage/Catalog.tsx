import { ProductProjection } from '@commercetools/platform-sdk';
import { Button } from 'primereact/button';
import { ToggleButton, ToggleButtonChangeEvent } from 'primereact/togglebutton';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/Client';
import { ProductItem } from '../../components/Product';
import { PRODUCTS_IN_PAGE } from '../../constants/common';
import { getPageCount, getPagesArray } from '../../utils/product';
import styles from './Catalog.module.scss';

export const Catalog = ({ ...options }): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const idCategory = options.options.id;

  const currentLocation = parseInt(location.search?.split('=')[1]) || 1;

  const [products, setProducts] = useState<ProductProjection[]>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(currentLocation);
  const startIndexProduct = (currentPage - 1) * PRODUCTS_IN_PAGE;
  const pagesArray = getPagesArray(totalPages);

  const [checkedPrice, setCheckedPrice] = useState<boolean>();
  const [checkedName, setCheckedName] = useState<boolean>();
  const sortedPrice = checkedPrice ? 'price desc' : 'price asc';
  const sortedName = checkedName ? 'name.en-us desc' : 'name.en-us asc';

  type FilterParams = {
    name: string;
    value: string | string[];
  };

  const [filterParams, setFilterParams] = useState<FilterParams[]>([]);

  useEffect(() => {
    setCurrentPage(currentLocation);
  }, [currentLocation]);

  useEffect(() => {
    const getCategoryProduct = async (): Promise<void> => {
      try {
        const params = Object.fromEntries(
          filterParams.map(n => [n.name, n.value]),
        );
        console.log(params);
        const products = await getProducts(
          startIndexProduct,
          PRODUCTS_IN_PAGE,
          idCategory,
          params.sort,
        );
        const totalCount = products.body.total;
        if (totalCount)
          setTotalPages(getPageCount(totalCount, PRODUCTS_IN_PAGE));
        setProducts(products.body.results);
      } catch (err) {
        console.error(err);
      }
    };
    getCategoryProduct();
  }, [startIndexProduct, idCategory, filterParams]);

  return (
    <>
      <ToggleButton
        checked={checkedPrice}
        onLabel="Price"
        offLabel="Price"
        onIcon="pi pi-arrow-up"
        offIcon="pi pi-arrow-down"
        onChange={(e: ToggleButtonChangeEvent): void => {
          setCheckedPrice(e.value);
          setFilterParams(currentArray => [
            ...currentArray.filter(el => el.name !== 'sort'),
            { name: 'sort', value: sortedPrice },
          ]);
        }}
        className="w-8rem"
      />
      <ToggleButton
        checked={checkedName}
        onLabel="Name"
        offLabel="Name"
        onIcon="pi pi-arrow-up"
        offIcon="pi pi-arrow-down"
        onChange={(e: ToggleButtonChangeEvent): void => {
          setCheckedName(e.value);
          setFilterParams(currentArray => [
            ...currentArray.filter(el => el.name !== 'sort'),
            { name: 'sort', value: sortedName },
          ]);
        }}
        className="w-8rem"
      />
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
