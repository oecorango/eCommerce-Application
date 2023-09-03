import { useNavigate } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import { Aside } from './Aside';
import styles from './ProductsCategory.module.scss';

export const ProductsCategory = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {/* <Aside /> */}

      {/* @ToDo сделать слайдер для категорий*/}
      <div className={styles.category}>
        <div
          className={styles.catalog}
          onClick={(): void => navigate(PAGES.catalog.route)}>
          Catalog
        </div>
        <div
          className={styles.accessories}
          onClick={(): void =>
            navigate(PAGES.catalog.route + PAGES.accessories.route)
          }>
          ACCESSORIES
        </div>
        <div
          className={styles.cosmetics}
          onClick={(): void =>
            navigate(PAGES.catalog.route + PAGES.cosmetics.route)
          }>
          COSMETICS
        </div>
        <div
          className={styles.textiles}
          onClick={(): void =>
            navigate(PAGES.catalog.route + PAGES.textiles.route)
          }>
          TEXTILES
        </div>
        {/* <div
          className={styles.sets}
          onClick={(): void =>
            navigate(PAGES.catalog.route + PAGES.sets.route)
          }>
          GIFT SETS
        </div> */}
      </div>
    </div>
  );
};
