import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logOut } from '../utils/utils';
import { AuthContext } from './authProvider';

export const LinkToHome = (): JSX.Element => (
  <>
    <NavLink to="/" className="flex flex-column align-items-center">
      <i className="pi pi-home" style={{ fontSize: '2rem' }}></i>
      Home
    </NavLink>
  </>
);

export const LinkToAbout = (): JSX.Element => (
  <>
    <NavLink to="/about" className="flex flex-column align-items-center">
      <i className="pi pi-users" style={{ fontSize: '2rem' }}></i>
      About
    </NavLink>
  </>
);

export const LinkToCart = (): JSX.Element => (
  <>
    <NavLink to="/cart" className="flex flex-column align-items-center">
      <i className="pi pi-shopping-bag" style={{ fontSize: '2rem' }}></i>
      Cart
    </NavLink>
  </>
);

export const LinkToSignIn = (): JSX.Element => (
  <>
    <NavLink to="/signin" className="flex flex-column align-items-center">
      <i className="pi pi-sign-in" style={{ fontSize: '2rem' }}></i>
      Sign in
    </NavLink>
  </>
);

export const LinkToRegistration = (): JSX.Element => (
  <>
    <NavLink to="/registration" className="flex flex-column align-items-center">
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
        to="/"
        className="flex flex-column align-items-center"
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
