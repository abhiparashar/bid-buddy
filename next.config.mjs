/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-56a7e5852f544d8598594d4fbe082cc2.r2.dev',
        pathname: '/**',
        port: ""
      },
      {
        hostname: "https://avatars.githubusercontent.com/u/53370391?v=4",
        protocol: "https",
        port: ""
      }
    ],
  },
};

export default nextConfig;