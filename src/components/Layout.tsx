import { Outlet } from 'react-router-dom';
import { Header } from './Headers';

export const Layout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
      <footer className="footer" style={{ color: '#7b6544' }}>
        RS-School 2023
      </footer>
    </>
  );
};
