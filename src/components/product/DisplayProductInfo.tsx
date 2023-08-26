import { Galleria, GalleriaResponsiveOptions } from 'primereact/galleria';
import { useEffect, useState } from 'react';
import { Image } from '@commercetools/platform-sdk';
import { getProductByKey } from '../../api/Client';
import { Card } from 'primereact/card';
import styles from './DisplayProductInfo.module.scss';
import { CENTS_PER_EURO } from '../../constants/common';

export function DisplayProductInfo(keyProduct: string): JSX.Element {
  const [images, setImages] = useState<Image[]>();
  const [nameProduct, setNameProduct] = useState<string>();
  const [descriptionProduct, setDescriptionProduct] = useState<string>();
  const [typeProduct, setTypeProduct] = useState<string>();
  const [priceProduct, setPriceProduct] = useState<string>();
  const [priceFullProduct, setpriceFullProduct] = useState<string>();
  const responsiveOptions: GalleriaResponsiveOptions[] = [
    {
      breakpoint: '991px',
      numVisible: 2,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
    },
    {
      breakpoint: '575px',
      numVisible: 2,
    },
  ];
  const covertPrice = (price: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(price / CENTS_PER_EURO);
  };

  useEffect(() => {
    getProductByKey(keyProduct).then(data => {
      const pathToPhoto = data.body.masterVariant.images;
      const productName = data.body.name['en-US'];
      const productDescription = data.body.description?.['en-US'];
      const productType = data.body.masterVariant.attributes?.[0].name;
      const productPrice = data.body.masterVariant.prices?.[0].value.centAmount;
      const productPriceFull =
        data.body.masterVariant.prices?.[1].value.centAmount;
      if (productPrice && productPriceFull) {
        const productPriceConvert = covertPrice(productPrice);
        const productPriceFullConvert = covertPrice(productPriceFull);
        setImages(pathToPhoto);
        setNameProduct(productName);
        setDescriptionProduct(productDescription);
        setTypeProduct(productType);
        setPriceProduct(productPriceConvert);
        setpriceFullProduct(productPriceFullConvert);
      }
    });
  }, [keyProduct]);
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
    <div className={styles.wrapper}>
      <div className="card">
        <Galleria
          value={images}
          responsiveOptions={responsiveOptions}
          numVisible={2}
          circular
          style={{ maxWidth: '500px' }}
          showItemNavigators
          showItemNavigatorsOnHover
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
        />
      </div>
      <Card title={nameProduct} subTitle={typeProduct} className="md:w-25rem">
        <p className="m-0">{descriptionProduct}</p>
        <p className={`m-0 ${styles.strikethrough}`}>{priceFullProduct}</p>
        <p className={`m-10 ${styles.highlight}`}>{priceProduct}</p>{' '}
      </Card>
    </div>
  );
}
