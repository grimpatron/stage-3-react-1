// store.js
import { createStore, combineReducers } from 'redux';
import formReducer from './../redux/formSlice'; // Ваш редюсер для формы

const rootReducer = combineReducers({
  form: formReducer, // Используйте 'form' как ключ для вашего редюсера
});

const store = createStore(rootReducer);

export default store;
