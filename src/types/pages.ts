export type PageKey =
  | 'main'
  | 'about'
  | 'cart'
  | 'signin'
  | 'registration'
  | 'catalog'
  | 'profile'
  | 'product';

export interface Page {
  key: PageKey;
  route: string;
}
