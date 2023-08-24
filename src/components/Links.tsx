import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import { logOut } from '../utils/user';
import { AuthContext } from './authProvider';

export const LinkToHome = (): JSX.Element => (
  <>
    <NavLink to={PAGES.main}>
      <i className="pi pi-home" style={{ fontSize: '2rem' }}></i>
      Home
    </NavLink>
  </>
);

export const LinkToAbout = (): JSX.Element => (
  <>
    <NavLink to={PAGES.about}>
      <i className="pi pi-users" style={{ fontSize: '2rem' }}></i>
      About
    </NavLink>
  </>
);

export const LinkToCart = (): JSX.Element => (
  <>
    <NavLink to={PAGES.cart}>
      <i className="pi pi-shopping-bag" style={{ fontSize: '2rem' }}></i>
      Cart
    </NavLink>
  </>
);

export const LinkToSignIn = (): JSX.Element => (
  <>
    <NavLink to={PAGES.signin}>
      <i className="pi pi-sign-in" style={{ fontSize: '2rem' }}></i>
      Sign in
    </NavLink>
  </>
);

export const LinkToRegistration = (): JSX.Element => (
  <>
    <NavLink to={PAGES.registration}>
      <i className="pi pi-user-edit" style={{ fontSize: '2rem' }}></i>
      Register
    </NavLink>
  </>
);

export const LinkToLogOut = (): JSX.Element => {
  const { setIsAuth } = useContext(AuthContext);

  return (
    <>
      <Link
        to={PAGES.main}
        onClick={(): void => {
          logOut();
          setIsAuth(false);
        }}>
        <i className="pi pi-sign-out" style={{ fontSize: '2rem' }}></i>
        Exit
      </Link>
    </>
  );
};
