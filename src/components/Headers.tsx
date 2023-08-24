import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './authProvider';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import {
  LinkToLogOut,
  LinkToRegistration,
  LinkToSignIn,
  commonLinks,
} from './Links';
import logo from '../assets/logo.png';
import styles from './Headers.module.scss';

export const Header = (): JSX.Element => {
  const { isAuth } = useContext(AuthContext);
  const Auth = (): JSX.Element => (
    <>
      {commonLinks}
      {isAuth ? (
        <LinkToLogOut />
      ) : (
        <>
          <LinkToSignIn />
          <LinkToRegistration />
        </>
      )}
    </>
  );
  function ShowBurger(): JSX.Element {
    const [visibleRight, setVisibleRight] = useState<boolean>(false);
    return (
      <div className="card">
        <div className={styles.burger__button}>
          <Button
            icon="pi pi-bars"
            onClick={(): void => setVisibleRight(true)}
          />
        </div>
        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={(): void => setVisibleRight(false)}>
          <div className={styles.open}>{<Auth />}</div>
        </Sidebar>
      </div>
    );
  }
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__wrapper}>
          <NavLink to="/">
            <img src={logo} alt="logo" className="w-6rem h-2rem" />
          </NavLink>
          {<ShowBurger />}
          <div className={styles.navigation}>
            {/* <Auth /> */}
            {commonLinks}
            {isAuth ? (
              <LinkToLogOut />
            ) : (
              <>
                <LinkToSignIn />
                <LinkToRegistration />
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
