import styles from './AboutPage.module.scss';
import { Button } from 'primereact/button';
import { DisplayProductInfo } from '../../components/DisplayProductInfo/DisplayProductInfo';
import { useLocation } from 'react-router-dom';

export function AboutPage(): JSX.Element {
  // const [showProduct, setShowProduct] = useState<boolean>(false);
  // const handleShowProduct = (): void => {
  //   setShowProduct(true);
  // };  bath-salt/ scrub/ soap
  const location = useLocation();
  const key = location.state;

  return (
    <div className={styles.page}>
      {/* <Button label="Submit" /> */}
      {DisplayProductInfo(key)}
      {/* @note Весь закоменченый код тут только для тестов  */}
    </div>
  );
}
