import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { ErrorPage } from './pages/ErrorPage';
import { MainPage } from './pages/MainPage';
import { SignInPage } from './pages/SignInPage';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { RegistrationPage } from './pages/RegistrationPage';
import { AuthContext } from './components/authProvider';
import { useEffect, useState } from 'react';

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
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route
              path="signin"
              element={isAuth ? <Navigate to={'/'} /> : <SignInPage />}
            />
            <Route
              path="registration"
              element={isAuth ? <Navigate to={'/'} /> : <RegistrationPage />}
            />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </>
  );
}

export default App;
