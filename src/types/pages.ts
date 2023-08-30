export type PageKey =
  | 'main'
  | 'about'
  | 'cart'
  | 'signin'
  | 'registration'
  | 'catalog'
  | 'profile'
  | 'product'
  | 'sets'
  | 'textiles'
  | 'cosmetics'
  | 'accessories';

export interface Page {
  key: PageKey;
  route: string;
}
