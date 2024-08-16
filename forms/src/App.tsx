import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './pages/Main/Main';
import ReactHookForm from './pages/ReactHookForm/ReactHookForm';
import UncontrolledForm from './pages/UncontrolledForm/UncontrolledForm';

const App = () => {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to='/'>Main</Link>
          </li>
          <li>
            <Link to='/uncontrolled'>Uncontrolled Form</Link>
          </li>
          <li>
            <Link to='/hook-form'>React Hook Form</Link>
          </li>
        </ul>
      </nav> */}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/uncontrolled' element={<UncontrolledForm />} />
        <Route path='/hook-form' element={<ReactHookForm />} />
      </Routes>
    </Router>
  );
};

export default App;
