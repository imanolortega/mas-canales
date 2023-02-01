/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.youtube.com'],
  },
}

module.exports = nextConfig
