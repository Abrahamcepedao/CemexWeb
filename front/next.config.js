/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_API_HOST: process.env.NEXT_API_HOST,
  }
}

module.exports = nextConfig
