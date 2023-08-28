import { useContext } from 'react';
import { AuthContext } from './authProvider';
import {
  commonLinks,
  LinkToLogOut,
  LinkToRegistration,
  LinkToSignIn,
} from './Links';

export const LinksForHeader = (): JSX.Element => {
  const { isAuth } = useContext(AuthContext);

  return (
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
};
