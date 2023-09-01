import { ProductProjection } from '@commercetools/platform-sdk';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Slider, SliderChangeEvent } from 'primereact/slider';
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
  // при переходе на категорию получаем ссылку путь категории, потом используем в фильтрации
  const idCategory = options.options.id;

  // испльзуем для хранения страниц в каталоге
  const currentLocation = parseInt(location.search?.split('=')[1]) || 1;

  const [products, setProducts] = useState<ProductProjection[]>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(currentLocation);
  const startIndexProduct = (currentPage - 1) * PRODUCTS_IN_PAGE;
  const pagesArray = getPagesArray(totalPages);

  // фильтрация по цене или имени
  const [checkedPrice, setCheckedPrice] = useState<boolean>();
  const [checkedName, setCheckedName] = useState<boolean>();
  const sortedPrice = checkedPrice ? 'price desc' : 'price asc';
  const sortedName = checkedName ? 'name.en-us desc' : 'name.en-us asc';

  // фильтрация по диапазону цен
  const [filterPriceMinMax, setFilterPriceMinMax] = useState<[number, number]>([
    0, 500,
  ]);

  const handleInputChange = (index: number, inputValue: string): void => {
    const updatedValue = [...filterPriceMinMax];
    updatedValue[index] = +inputValue;
    setFilterPriceMinMax(updatedValue as [number, number]);
  };

  const filterByPrice = `variants.price.centAmount:range (${
    filterPriceMinMax[0] * 100
  } to ${filterPriceMinMax[1] * 100})`;

  // объект для фильтрации или сортировки
  type FilterParams = {
    name: string;
    value: string;
  };

  // массив со всеми фильтрами и сортировками
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
          [idCategory, params.priceFilter],
          params.sort,
          params.searchText,
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
      <div className="card flex justify-content-start">
        <div className="w-14rem">
          <span>Цена</span>
          <div className="input-container">
            <label htmlFor="fromInput">From</label>
            <InputText
              id="fromInput"
              value={filterPriceMinMax[0].toString()}
              onChange={(e): void => handleInputChange(0, e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="toInput">To</label>
            <InputText
              id="toInput"
              value={filterPriceMinMax[1].toString()}
              onChange={(e): void => handleInputChange(1, e.target.value)}
            />
          </div>
          <Slider
            value={filterPriceMinMax}
            onChange={(e: SliderChangeEvent): void =>
              setFilterPriceMinMax(e.value as [number, number])
            }
            className="w-14rem"
            range
          />
          <Button
            label="Filter Price"
            onClick={(): void => {
              setFilterParams(currentArray => [
                ...currentArray.filter(el => el.name !== 'priceFilter'),
                { name: 'priceFilter', value: filterByPrice },
              ]);
            }}
          />
        </div>
      </div>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          placeholder="Search"
          onChange={(event): void => {
            if (event.target.value.length >= 3) {
              setFilterParams(currentArray => [
                ...currentArray.filter(el => el.name !== 'searchText'),
                { name: 'searchText', value: event.target.value },
              ]);
            }
          }}
        />
      </span>
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
