import { cartAll, cartID, changeItemQuantity } from '../../api/customerCart';
import { useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk';
import { cartData } from './CartList';
import { count } from '../../constants/registratForm';

//===========================d6d734ce-465d-4174-8236-493f7e872176
export interface IuseCartID {
  asyncCartID: () => void;
  isLoading: boolean;
  response: LineItem[];
  error: string;
  version: number;
}
export function useCartID(ID: string): IuseCartID {
  const [isLoading, setLoading] = useState(true);
  const [response, setResponse] = useState(cartData);
  const [version, setVersion] = useState(0);
  const [error, setError] = useState('===000===');

  const asyncCartID = async (): Promise<void> => {
    await cartID(ID)
      .then(body => {
        if (body.statusCode === 200) {
          cartData.splice(0, cartData.length);
          body.body.lineItems.forEach(data => {
            cartData.push(data);
          });
          setResponse(body.body.lineItems);
          setVersion(body.body.version);
          setError('===111===');
        }
      })
      .catch(error => {
        setResponse(error.statusCode);
        console.warn(error);
        if (error.code === 400) {
          setError(`ERROR: ${error.message}${error.code}`);
        } else {
          setError(`ERROR: ${error.message}${error.code}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { asyncCartID, isLoading, response, error, version };
}

export interface IuseCartAll {
  asyncCartAll: () => void;
  isLoading: boolean;
  response: number;
  error: string;
}
export function useCartAll(): IuseCartAll {
  const [isLoading, setLoading] = useState(true);
  const [response, setResponse] = useState(0);
  const [error, setError] = useState('');

  const asyncCartAll = async (): Promise<void> => {
    await cartAll()
      .then(body => {
        if (body.statusCode === 200) {
          setResponse(body.body.results.length);
          setError('');
        }
      })
      .catch(error => {
        setResponse(error.statusCode);
        console.warn(error);
        if (error.code === 400) {
          setError(`ERROR: ${error.message}${error.code}`);
        } else {
          setError(`ERROR: ${error.message}${error.code}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { asyncCartAll, isLoading, response, error };
}

export interface IuseUpdateItem {
  cartUpdateItem: (quantity: number) => void;
  isLoading: boolean;
  response: number;
  error: string;
}
let version = 818;
export function useUpdateItem(): IuseUpdateItem {
  const [isLoading, setLoading] = useState(true);
  const [response, setResponse] = useState(0);
  const [error, setError] = useState('');

  const cartUpdateItem = async (quantity: number): Promise<void> => {
    await changeItemQuantity(
      'd6d734ce-465d-4174-8236-493f7e872176',
      count.versionCart,
      [
        {
          action: 'changeLineItemQuantity',
          lineItemId: 'aa24f2e2-9a84-47bb-a1b0-3f1e88ce6df9',
          quantity: quantity,
        },
      ],
    )
      .then(body => {
        // console.log('=V===', body.body.version);
        count.versionCart = body.body.version;
        version = body.body.version;
        if (body.statusCode === 200) {
          setResponse(quantity);
          setError('');
        }
      })
      .catch(error => {
        setResponse(error.statusCode);
        console.warn(error);
        if (error.code === 400) {
          setError(`ERROR: ${error.message}${error.code}`);
        } else {
          setError(`ERROR: ${error.message}${error.code}`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { cartUpdateItem, isLoading, response, error };
}
