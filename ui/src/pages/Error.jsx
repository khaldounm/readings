import { useRouteError } from "react-router-dom";

export const Error = () => {
  const error = useRouteError();
  const errorMessage = `${error.status}: ${error.statusText}`;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <b>{errorMessage}</b>
      </p>
    </div>
  );
};