// import React from 'react';
// import ReactDOM from 'react-dom/client';
// // import App from './components/App/App.tsx';
// import './index.css';
// import { ThemeContextProvider } from './context/ThemeContext.tsx';
// import store from './store/store.tsx';
// import { Provider } from 'react-redux';
// import App from 'next/app';
// // import HomePage from './app/[[...slug]]/page.tsx';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <ThemeContextProvider>
//       <Provider store={store}>
//         <App />
//         {/* <HomePage /> */}
//       </Provider>
//     </ThemeContextProvider>
//   </React.StrictMode>
// );

'use client';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeContextProvider } from './context/ThemeContext.tsx';
// import App from './components/App/App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider children={undefined}>{/* <App /> */}</ThemeContextProvider>
  </React.StrictMode>
);
