import { Aside } from '../components/Aside';

export const MainPage = (): JSX.Element => {
  return (
    <>
      <div className="wrapper main content">
        <Aside />
        <div className="main__content">
          <div className="main__header">
            <p>The best items</p>
            <p>&nbsp; for your bath</p>
          </div>
          <h1>Main page</h1>
          <p>This is main page</p>
        </div>
      </div>
    </>
  );
};
