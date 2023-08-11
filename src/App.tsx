import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { ErrorPage } from './pages/ErrorPage';
import { MainPage } from './pages/MainPage';
import { SignInPage } from './pages/SignInPage';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { RegistrationPage } from './pages/RegistrationPage';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: '/',
//         element: <MainPage />,
//       },
//       {
//         path: 'signin',
//         element: <SignInPage />,
//         children: [
//           {
//             path: 'registration',
//             element: <RegistrationPage />,
//           },
//         ],
//       },
//       {
//         path: 'about',
//         element: <AboutPage />,
//       },
//     ],
//   },
// ]);

// const App = (): React.ReactElement => {
//   return <RouterProvider router={router} />;
// };

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
