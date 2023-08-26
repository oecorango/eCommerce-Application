import { useState } from 'react';
import styles from './AboutPage.module.scss';
import { Button } from 'primereact/button';
import { DisplayProductInfo } from '../../components/product/DisplayProductInfo';

//   const handleButtonClick = (): void => {
//     getProductByKey('body-cream').then(product => {
//       const pathToPhoto = product.body.masterVariant.images;
//       pathToPhoto?.forEach(image => console.log('путя =', image.url));
//       console.log('по key = ', product.body);
//       console.log('имя = ', product.body.name['en-US']);
//       console.log(
//         'путь к картинке = ',
//         product.body.masterVariant.images?.[0].url,
//       );
//       console.log('путь к картинкАМ = ', product.body.masterVariant.images);
//       console.log('путь к картинкАМ = ', arr);
// interface Image {
//   url: string;
//   dimensions: ImageDimensions;
//   label: string;
// }

// DisplayProductInfo('body-cream')  @note Пример вызова функции

export function AboutPage(): JSX.Element {
  const [productKey, setProductKey] = useState<string>('body-cream');
  const handleShowProductInfo = (): void => {
    // setProductKey('body-cream');
    // DisplayProductInfo(`${setProductKey}`);
    console.log('Test');
  };
  return (
    <div className={styles.page}>
      <Button label="Submit" onClick={handleShowProductInfo} />
      {/* {showProductInfo && DisplayProductInfo('body-cream')} */}
      {DisplayProductInfo('body-cream')}
    </div>
  );
}
