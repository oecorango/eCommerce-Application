import { useEffect, useState } from 'react';
import { getProductByKey } from '../../api/Client';
import styles from './AboutPage.module.scss';
import { Button } from 'primereact/button';
import { Galleria, GalleriaResponsiveOptions } from 'primereact/galleria';
import { Image } from '@commercetools/platform-sdk';

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
export function AboutPage(): JSX.Element {
  const [images, setImages] = useState<Image[]>();
  const responsiveOptions: GalleriaResponsiveOptions[] = [
    {
      breakpoint: '991px',
      numVisible: 4,
    },
    {
      breakpoint: '767px',
      numVisible: 3,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];

  useEffect(() => {
    getProductByKey('body-cream').then(data => {
      const pathToPhoto = data.body.masterVariant.images;
      setImages(pathToPhoto);
    });
  }, []);

  const itemTemplate = (item: Image): JSX.Element => {
    return (
      <img
        src={item.url}
        alt={item.label}
        style={{ width: '100%', display: 'block' }}
      />
    );
  };

  const thumbnailTemplate = (item: Image): JSX.Element => {
    return <img src={item.url} alt={item.label} style={{ width: '50%' }} />;
  };

  return (
    <div className={styles.page}>
      <div className="card">
        <Galleria
          value={images}
          responsiveOptions={responsiveOptions}
          numVisible={3}
          circular
          style={{ maxWidth: '500px' }}
          showItemNavigators
          showItemNavigatorsOnHover
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
        />
      </div>
    </div>
  );
}
