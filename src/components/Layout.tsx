import { Outlet } from 'react-router-dom';
import { Header } from './header';

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <footer className="footer">RS-School 2023</footer>
    </>
  );
};
