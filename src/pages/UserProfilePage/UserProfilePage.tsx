import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataForm from '../../components/Forms/UserDataForm';
import { PAGES } from '../../constants/pages';
import { count } from '../../constants/registratForm';

export const UserProfilePage = (): JSX.Element => {
  const toSignInPage = useNavigate();
  const id = localStorage.getItem('id');
  if (id) count.ID = id;
  useEffect(() => {
    if (!count.ID) {
      toSignInPage(PAGES.signin.route);
    }
  }, []);

  return (
    <div>
      {count.ID ? (
        <div className="content wrapper">
          <h1>Profile</h1>
          <p>Profile</p>
          <div className="registration__page content">
            <UserDataForm />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
