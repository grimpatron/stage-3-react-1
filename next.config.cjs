/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH, // Sets the base path to `/some-base-path`.
  output: 'standalone',
  webpack: (config) => {
    config.resolve.fallback = { process: require('process/browser') };
    return config;
  },
};

module.exports = nextConfig;
