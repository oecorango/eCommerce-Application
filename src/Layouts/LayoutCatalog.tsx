import { Outlet } from 'react-router-dom';
import { Aside } from '../components/Aside';
import { ProductsCategory } from '../components/ProductsCategory';
import styles from './LayoutCatalog.module.scss';

export const LayoutCatalog = (): JSX.Element => {
  return (
    <>
      <div className={styles.page}>
        <Aside />
        <div className={styles.page__content}>
          <ProductsCategory />
          <Outlet />
        </div>
      </div>
    </>
  );
};
