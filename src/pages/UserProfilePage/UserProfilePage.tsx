import UserDataForm from '../../components/Forms/UserDataForm';

export const UserProfilePage = (): JSX.Element => {
  return (
    <div className="content wrapper">
      <h1>Profile</h1>
      <p>Profile</p>
      <div className="registration__page content">
        <UserDataForm />
      </div>
    </div>
  );
};
