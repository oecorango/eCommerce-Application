import { Link } from 'react-router-dom';

export const ErrorPage = (): JSX.Element => {
  return (
    <div className="content wrapper">
      <div className="error__page">
        <p>
          This page was not found, return to the <Link to="/">main page</Link>?
        </p>
      </div>
    </div>
  );
};
