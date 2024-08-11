import React from 'react';
import { GetServerSideProps } from 'next';
import RootLayout from './RootLayout';

interface HomeProps {
  initialSearchResults: string[];
}

const Home: React.FC<HomeProps> = ({ initialSearchResults }) => {
  return <RootLayout initialSearchResults={initialSearchResults} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.example.com/search-results');
  const initialSearchResults = await res.json();

  return {
    props: {
      initialSearchResults,
    },
  };
};

export default Home;
