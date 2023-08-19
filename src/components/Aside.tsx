import { Link } from 'react-router-dom';

export const Aside = (): JSX.Element => {
  return (
    <aside className="aside">
      <Link to={'/'}>Home</Link>
      <Link to={'/about'}>About</Link>
      <Link to={'/cart'}>Cart</Link>
      <Link to={'/profile'}>Profile</Link>
      <Link to={'/signin'}>Signin</Link>
      <Link to={'/registration'}>Registration</Link>
    </aside>
  );
};
