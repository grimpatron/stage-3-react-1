import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// const ProblematicComponent = () => {
//   throw new Error('Test error');
// };

describe('ErrorBoundary Component', () => {
  test('renders children without crashing', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  // test('displays error message when an error is caught', () => {
  //   render(
  //     <ErrorBoundary>
  //       <ProblematicComponent />
  //     </ErrorBoundary>
  //   );
  //   // expect(screen.getByText((content, element) => {
  //   //   return element.tagName.toLowerCase() === 'h3' && content.includes("You've just broken the application.");
  //   // })).toBeInTheDocument();
  //   expect(screen.getAllByText('💀 💀 💀')).toHaveLength(2);
  // });
});
