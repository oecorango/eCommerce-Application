type PageRoutes =
  | '/'
  | '/about'
  | '/cart'
  | '/signin'
  | '/registration'
  | '/catalog'
  | '/profile';

export interface Pages {
  main: PageRoutes;
  about: PageRoutes;
  cart: PageRoutes;
  signin: PageRoutes;
  registration: PageRoutes;
  catalog: PageRoutes;
  profile: PageRoutes;
}
