import { useState } from 'react';
import styles from './AboutPage.module.scss';
import { Button } from 'primereact/button';
import { DisplayProductInfo } from '../../components/product/DisplayProductInfo';

export function AboutPage(): JSX.Element {
  // const [showProduct, setShowProduct] = useState<boolean>(false);
  // const handleShowProduct = (): void => {
  //   setShowProduct(true);
  // };
  return (
    <div className={styles.page}>
      <Button label="Submit" />
      {DisplayProductInfo('body-cream')}
      {/* @note Весь закоменченый код тут только для тестов  */}
    </div>
  );
}
