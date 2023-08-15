import { Button } from 'primereact/button';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './authProvider';

export const Header = (): JSX.Element => {
  const { isAuth } = useContext(AuthContext);

  const Auth = (): JSX.Element => {
    if (isAuth) {
      return authNavigation;
    }
    return noAuthNavigation;
  };

  const noAuthNavigation = (
    <>
      <NavLink to="/" className="flex flex-column align-items-center">
        <i className="pi pi-home" style={{ fontSize: '2rem' }}></i>
        Home
      </NavLink>

      <NavLink to="/about" className="flex flex-column align-items-center">
        <i className="pi pi-users" style={{ fontSize: '2rem' }}></i>
        About
      </NavLink>

      <NavLink to="/cart" className="flex flex-column align-items-center">
        <i className="pi pi-shopping-bag" style={{ fontSize: '2rem' }}></i>
        Cart
      </NavLink>

      <NavLink to="/signin" className="flex flex-column align-items-center">
        <i className="pi pi-sign-in" style={{ fontSize: '2rem' }}></i>
        Sign in
      </NavLink>

      <NavLink
        to="/registration"
        className="flex flex-column align-items-center">
        <i className="pi pi-user-edit" style={{ fontSize: '2rem' }}></i>
        Register
      </NavLink>
    </>
  );

  const authNavigation = (
    <>
      <NavLink to="/" className="flex flex-column align-items-center">
        <i className="pi pi-home" style={{ fontSize: '2rem' }}></i>
        Home
      </NavLink>

      <NavLink to="/about" className="flex flex-column align-items-center">
        <i className="pi pi-users" style={{ fontSize: '2rem' }}></i>
        About
      </NavLink>

      <NavLink to="/cart" className="flex flex-column align-items-center">
        <i className="pi pi-shopping-bag" style={{ fontSize: '2rem' }}></i>
        Cart
      </NavLink>

      <NavLink to="/signin" className="flex flex-column align-items-center">
        <i className="pi pi-sign-out" style={{ fontSize: '2rem' }}></i>
        Exit
      </NavLink>
    </>
  );

  return (
    <>
      <header className="header">
        <div className="wrapper header__wrapper">
          <NavLink to="/">LOGO</NavLink>
          <div className="navigation flex">
            <Auth />
          </div>
        </div>
      </header>
    </>
  );
};
