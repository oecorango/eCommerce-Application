import { ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import { getCategoryProducts, getProducts } from '../../api/Client';
import { Aside } from '../../components/Aside';
import { ProductItem } from '../../components/Product';
import styles from './MainPage.module.scss';
import accessories from '../../assets/accessories.jpg';
import cosmetics from '../../assets/cosmetics.jpg';
import textiles from '../../assets/textiles.jpg';
import sets from '../../assets/gift_set.jpg';
import { Button } from 'primereact/button';

const productInPage = 6; // вынести в константы

export const MainPage = (): JSX.Element => {
  // посмотреть что тут происходит с названиями констант
  const [products, setProducts] = useState<ProductProjection[]>();
  const [allPages = 0, setAllPages] = useState<number>();
  const [currentPage = 0, setCurrentPage] = useState<number>();
  const product = currentPage * productInPage;

  useEffect(() => {
    const allProduct = async (): Promise<void> => {
      const products = await getProducts(product, productInPage);
      if (products.body.total)
        setAllPages(Math.ceil(products.body.total / productInPage));
      setProducts(products.body.results);
    };
    allProduct();
  }, [product]);

  type CategoryProduct = {
    name: string;
    id: string;
  };

  const allCategoryProduct = async (): Promise<CategoryProduct[]> => {
    const arr: CategoryProduct[] = [];
    const allCategoryProduct = await getCategoryProducts();
    allCategoryProduct.body.results.forEach(category => {
      const name = category.name?.['en-US'];
      const id = category.id;
      arr.push({ name: name, id: id });
    });
    return arr;
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
          <div className={styles.category}>
            <div>
              <img src={accessories} alt="" />
              <Button>To accessories</Button>
            </div>
            <div>
              <img src={cosmetics} alt="" />
              <Button>To cosmetics</Button>
            </div>
            <div>
              <img src={textiles} alt="" />
              <Button>To textiles</Button>
            </div>
            <div>
              <img src={sets} alt="" />
              <Button>To gift sets</Button>
            </div>
          </div>
          <div className={styles.content}>
            {products?.map(data => <ProductItem {...data} key={data.id} />)}
          </div>
          <Button
            onClick={(): void => {
              if (currentPage > 0) setCurrentPage(currentPage - 1); // убрать маг числа
            }}>
            Prev
          </Button>
          <Button
            onClick={(): void => {
              if (currentPage < allPages - 1) setCurrentPage(currentPage + 1); // убрать маг числа
            }}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};
