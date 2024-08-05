'use client';

export async function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['favorite'] },
    { slug: ['not-found'] },
  ];
}
