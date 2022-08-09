/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}
const withCSS = require('@zeit/next-css')
module.exports = withCSS({
  cssModules: true
})
module.exports = nextConfig
