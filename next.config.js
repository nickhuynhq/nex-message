/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  }
}

module.exports = nextConfig
