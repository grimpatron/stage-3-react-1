"use client"

import { useRouter } from 'next/router';

function NotFound() {
  const router = useRouter();

  return (
    <>
      <h1>Not Found 404</h1>
      <div>
        Nothing found for this search: <b>{router.asPath}</b>
      </div>
    </>
  );
}

export default NotFound;
