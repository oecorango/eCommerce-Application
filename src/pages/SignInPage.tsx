import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { FormSingIn } from '../components/Forms/SignInForm';

export const SignInPage = (): JSX.Element => {
  const toRegistrationForm = useNavigate();

  return (
    <div className="auth__page content">
      <FormSingIn />
      <h4
        className="center mb-2 pl-2 pr-2 text-center"
        style={{ color: '#7b6544' }}>
        If you are not registered, please register in our store.
      </h4>

      <Button
        className="mt-3 mb-8 border-round-lg"
        label="Registration"
        type="button"
        onClick={(): void => toRegistrationForm('/registration')}
      />
    </div>
  );
};
