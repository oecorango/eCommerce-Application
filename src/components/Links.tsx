import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logOut } from '../utils/user';
import { AuthContext } from './authProvider';
import styles from './Links.module.scss';

export const commonLinks = [
  <NavLink to="/">
    <i className={`pi pi-home ${styles.fontSize}`}></i>
    Home
  </NavLink>,
  <NavLink to="/about">
    <i className={`pi pi-users ${styles.fontSize}`}></i>
    About
  </NavLink>,
  <NavLink to="/cart">
    <i className={`pi pi-shopping-bag ${styles.fontSize}`}></i>
    Cart
  </NavLink>,
];

export const LinkToSignIn = (): JSX.Element => (
  <NavLink to="/signin">
    <i className={`pi pi-sign-in ${styles.fontSize}`}></i>
    Sign in
  </NavLink>
);

export const LinkToRegistration = (): JSX.Element => (
  <NavLink to="/registration">
    <i className={`pi pi-user-edit ${styles.fontSize}`}></i>
    Register
  </NavLink>
);

export const LinkToLogOut = (): JSX.Element => {
  const { setIsAuth } = useContext(AuthContext);

  const handleLogOut = (): void => {
    logOut();
    setIsAuth(false);
  };

  return (
    <Link to="/" onClick={handleLogOut}>
      <i className={`pi pi-sign-out ${styles.fontSize}`}></i>
      Exit
    </Link>
  );
};
