import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './authProvider';
import {
  LinkToAbout,
  LinkToCart,
  LinkToHome,
  LinkToLogOut,
  LinkToRegistration,
  LinkToSignIn,
} from './Links';

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
      <LinkToHome />
      <LinkToAbout />
      <LinkToCart />
      <LinkToSignIn />
      <LinkToRegistration />
    </>
  );

  const authNavigation = (
    <>
      <LinkToHome />
      <LinkToAbout />
      <LinkToCart />
      <LinkToLogOut />
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
