'use client';

import { Provider } from 'react-redux';
import { store } from '../../store/store';
import RootLayout from './RootLayout';

interface PageComponentProps {
  initialSearchResults: string[];
}

const PageComponent: React.FC<PageComponentProps> = ({ initialSearchResults }) => {
  return (
    <div>
      <Provider store={store}>
        <RootLayout initialSearchResults={initialSearchResults} />
      </Provider>
    </div>
  );
};

export default PageComponent;
