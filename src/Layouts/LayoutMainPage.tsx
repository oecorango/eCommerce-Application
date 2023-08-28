import { Outlet } from 'react-router-dom';
import { Aside } from '../components/Aside';
import styles from './LayoutMainPage.module.scss';

export const LayoutMainPage = (): JSX.Element => {
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
            <div className={styles.accessories}>ACCESSORIES</div>
            <div className={styles.cosmetics}>COSMETICS</div>
            <div className={styles.textiles}>TEXTILES</div>
            <div className={styles.sets}>GIFT SETS</div>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};
