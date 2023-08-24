import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { MainPage } from './pages/MainPage/MainPage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { AuthContext } from './components/authProvider';
import { useEffect, useState } from 'react';
import 'primereact/resources/themes/mira/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.scss';
import { PAGES } from './constants/pages';

function App(): JSX.Element {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuth,
          setIsAuth,
        }}>
        <Routes>
          <Route path={PAGES.main} element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route
              path={PAGES.signin}
              element={isAuth ? <Navigate to={PAGES.main} /> : <SignInPage />}
            />
            <Route
              path={PAGES.registration}
              element={
                isAuth ? <Navigate to={PAGES.main} /> : <RegistrationPage />
              }
            />
            <Route path={PAGES.about} element={<AboutPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
