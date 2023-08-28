import { Galleria, GalleriaResponsiveOptions } from 'primereact/galleria';
import { useEffect, useRef, useState } from 'react';
import { Image as ImageSDK } from '@commercetools/platform-sdk';
import { getProductByKey } from '../../api/Client';
import { Card } from 'primereact/card';
import styles from './DisplayProductInfo.module.scss';
import { FIRST_INDEX } from '../../constants/common';
import { covertPrice } from '../../utils/product';

export function DisplayProductInfo(keyProduct: string): JSX.Element {
  const [images, setImages] = useState<ImageSDK[]>();
  const [nameProduct, setNameProduct] = useState<string>();
  const [descriptionProduct, setDescriptionProduct] = useState<string>();
  const [typeProduct, setTypeProduct] = useState<string>();
  const [priceProductDiscount, setPriceProduct] = useState<string>();
  const [priceFullProduct, setpriceFullProduct] = useState<string>();
  const galleria = useRef<Galleria>(null);
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

  useEffect(() => {
    getProductByKey(keyProduct)
      .then(data => {
        const pathToPhoto = data.body.masterVariant.images;
        const productName = data.body.name['en-US'];
        const productDescription = data.body.description?.['en-US'];
        const productType =
          data.body.masterVariant.attributes?.[FIRST_INDEX].name;
        const productPriceDiscounted =
          data.body.masterVariant.prices?.[FIRST_INDEX].discounted?.value
            .centAmount;
        const productPriceFull =
          data.body.masterVariant.prices?.[FIRST_INDEX].value.centAmount;
        if (productPriceFull) {
          const productPriceFullConvert = covertPrice(productPriceFull);
          setImages(pathToPhoto);
          setNameProduct(productName);
          setDescriptionProduct(productDescription);
          setTypeProduct(productType);
          setpriceFullProduct(productPriceFullConvert);
        }
        if (productPriceDiscounted) {
          const productPriceConvert = covertPrice(productPriceDiscounted);
          setPriceProduct(productPriceConvert);
        } else {
          setPriceProduct('');
        }
      })
      .catch(error => {
        console.warn('Произошла ошибка при получении данных:', error);
      });
  }, [keyProduct]);
  const handleImageClick = (): void => {
    galleria.current?.show();
  };
  const itemTemplate = (item: ImageSDK): JSX.Element => {
    return (
      <img
        src={item.url}
        alt={item.label}
        style={{ width: '100%', display: 'block' }}
        onClick={handleImageClick}
      />
    );
  };

  const thumbnailTemplate = (item: ImageSDK): JSX.Element => {
    return <img src={item.url} alt={item.label} style={{ width: '50%' }} />;
  };

  return (
    <>
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
        <Galleria
          ref={galleria}
          value={images}
          numVisible={2}
          style={{ maxWidth: '100%' }}
          className={styles.enlarged}
          circular
          fullScreen
          showItemNavigators
          showThumbnails={false}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
        />
        <Card title={nameProduct} subTitle={typeProduct} className="md:w-25rem">
          <p className="m-0">{descriptionProduct}</p>
          {priceProductDiscount ? (
            <p className={`${styles.strikethrough} m-0`}>{priceFullProduct}</p>
          ) : (
            <p className={`${styles.noDiscount} m-0`}>{priceFullProduct}</p>
          )}
          <p className={`m-10 ${styles.highlight}`}>{priceProductDiscount}</p>{' '}
        </Card>
      </div>
    </>
  );
}
