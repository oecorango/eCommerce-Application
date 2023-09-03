import { BreadCrumb } from 'primereact/breadcrumb';
import { MenuItem } from 'primereact/menuitem';
import { Outlet, useLocation } from 'react-router-dom';
import { ProductsCategory } from '../components/ProductsCategory';
import { PAGES } from '../constants/pages';
import styles from './LayoutCatalog.module.scss';

export const LayoutCatalog = (): JSX.Element => {
  const location = useLocation();

  const items: MenuItem[] = [];
  const home: MenuItem = { icon: 'pi pi-home', url: '/' };

  location.pathname.split('/').forEach(path => {
    if (path === PAGES.catalog.key) {
      items.push({ label: `${path}`, url: `/${path}` });
    }
    if (path.length && path !== PAGES.catalog.key) {
      items.push({ label: `${path}` });
    }
  });

  return (
    <>
      <div className={styles.page}>
        <div className={styles.page__content}>
          <ProductsCategory />
          <BreadCrumb model={items} home={home} />
          <Outlet />
        </div>
      </div>
    </>
  );
};
