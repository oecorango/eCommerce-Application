import styles from './AboutPage.module.scss';
import { FilterByPrice } from '../../components/filterProduct';

export function AboutPage(): JSX.Element {
  // тесты @Note для тестов визуала
  // (startIndexProduct, PRODUCTS_IN_PAGE);

  return (
    <div className={styles.page}>
      <p>Hello World</p>
      <FilterByPrice />
    </div>
  );
}
