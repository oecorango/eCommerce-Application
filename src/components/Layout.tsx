import { NavLink, Outlet } from 'react-router-dom';

export const Layout = (): JSX.Element => {
  return (
    <>
      <header className="header">
        <div className="wrapper header__wrapper">
          <div>LOGO</div>
          <div className="navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/signin">Sign in</NavLink>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="footer">RS-School 2023</footer>
    </>
  );
};
