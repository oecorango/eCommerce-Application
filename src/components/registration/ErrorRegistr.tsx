export const ErrorRegistr = (props: {
  message: string | undefined;
}): JSX.Element => {
  return <div style={{ color: 'red', marginBottom: 10 }}>{props.message}</div>;
};
export default ErrorRegistr;
