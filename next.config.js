/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt']
  }, 
  reactStrictMode: true,
}

module.exports = nextConfig
