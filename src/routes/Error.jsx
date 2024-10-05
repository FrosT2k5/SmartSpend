import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <>
      <div>Oops! An error...</div>
      <p>{error.message || error.statusText}</p>
    </>
  )
}

export default Error