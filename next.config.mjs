/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // Penyesuaian untuk reverse proxy
  basePath: '',

  // Konfigurasi untuk header jika domain berbeda dengan asal
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
