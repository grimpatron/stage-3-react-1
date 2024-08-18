import Form from '../../components/Form';
import { Provider } from 'react-redux';
import store from '../../store/store';

function ReactHookForm() {
  return (
    <>
      <Provider store={store}>
        <div className='App'>
          <h1>React Hook Form page</h1>
          <Form />
        </div>
      </Provider>
    </>
  );
}
export default ReactHookForm;
