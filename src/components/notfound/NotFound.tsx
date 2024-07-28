import { useLocation } from 'react-router-dom';
function NotFound() {
  const location = useLocation();

  return (
    <>
      <h1>Not Found 404</h1>
      <div>
        Nothing found for this search: <b>{location.pathname}</b>
      </div>
    </>
  );
}

export default NotFound;
