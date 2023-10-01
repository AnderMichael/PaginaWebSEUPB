/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home/cafeteria',
        permanent: true,
      },
    ]
  },
}

module.exports=nextConfig;