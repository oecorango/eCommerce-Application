import { Link } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import styles from './Aside.module.scss';

export const Aside = (): JSX.Element => {
  return (
    <aside className={styles.aside}>
      <Link to={PAGES.main}>Home</Link>
      <Link to={PAGES.about}>About</Link>
      <Link to={PAGES.cart}>Cart</Link>
      <Link to={PAGES.profile}>Profile</Link>
      <Link to={PAGES.signin}>Signin</Link>
      <Link to={PAGES.registration}>Registration</Link>
    </aside>
  );
};
