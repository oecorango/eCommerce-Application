import { CENTS_PER_EURO } from '../constants/common';

export const covertPrice = (price: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price / CENTS_PER_EURO);
};
