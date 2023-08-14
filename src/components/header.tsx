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
      <NavLink to="/"></NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      <NavLink to="/signin">Sign in</NavLink>
      <NavLink to="/registration">Registration</NavLink>
    </>
  );

  const authNavigation = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      <Button>Exit</Button>
    </>
  );

  return (
    <>
      <header className="header">
        <div className="wrapper header__wrapper">
          <NavLink to="/">LOGO</NavLink>
          <div className="navigation">
            <Auth />
          </div>
        </div>
      </header>
    </>
  );
};
