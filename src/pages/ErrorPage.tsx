import { Link } from 'react-router-dom';

export const ErrorPage = (): JSX.Element => {
  return (
    <div className="content wrapper">
      This page was not found, return to the <Link to="/">main</Link> page?
    </div>
  );
};
