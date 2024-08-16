import { Link } from 'react-router-dom';

function Main() {
  return (
    <>
      <div>
        <h1>Main Page</h1>
        <ul>
          <li>
            <Link to='/uncontrolled'>Uncontrolled Form</Link>
          </li>
          <li>
            <Link to='/hook-form'>React Hook Form</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
export default Main;
