import styles from './AboutPage.module.scss';
import { Button } from 'primereact/button';
import { DisplayProductInfo } from '../../components/Forms/product/DisplayProductInfo';

export function AboutPage(): JSX.Element {
  // const [showProduct, setShowProduct] = useState<boolean>(false);
  // const handleShowProduct = (): void => {
  //   setShowProduct(true);
  // };  bath-salt/ scrub/ soap
  return (
    <div className={styles.page}>
      <Button label="Submit" />
      {DisplayProductInfo('bath-salt')}
      {/* @note Весь закоменченый код тут только для тестов  */}
    </div>
  );
}
