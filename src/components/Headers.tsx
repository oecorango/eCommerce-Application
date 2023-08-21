import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './authProvider';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import {
  LinkToAbout,
  LinkToCart,
  LinkToHome,
  LinkToLogOut,
  LinkToRegistration,
  LinkToSignIn,
} from './Links';
import logo from '../assets/logo.png';

export const Header = (): JSX.Element => {
  const { isAuth } = useContext(AuthContext);

  const Auth = (): JSX.Element => {
    if (isAuth) {
      return authNavigation;
    }
    return noAuthNavigation;
  };

  function ShowBurger(): JSX.Element {
    const [visibleRight, setVisibleRight] = useState<boolean>(false);
    return (
      <div className="card">
        <div className="flex gap-2 justify-content-center">
          <Button
            icon="pi pi-bars"
            onClick={(): void => setVisibleRight(true)}
            className="burger-button"
          />
        </div>
        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={(): void => setVisibleRight(false)}>
          <div className="open">
            <Auth />
          </div>
        </Sidebar>
      </div>
    );
  }

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
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-6rem h-2rem" />
          </NavLink>
          <ShowBurger />
          <div className="navigation">
            <Auth />
          </div>
        </div>
      </header>
    </>
  );
};
