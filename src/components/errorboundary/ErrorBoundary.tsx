import { Component } from 'react';

class ErrorBoundary extends Component<{ children?: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children?: React.ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: object, errorInfo: object) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>💀 💀 💀</h2>
          <h3 className='eb-message'>You've just broken the application.</h3>
          <h2>💀 💀 💀</h2>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
