/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Remove deprecated outputStandalone option
  },
  transpilePackages: [
    'antd',
    '@ant-design/charts',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    'rc-notification',
    'rc-tooltip',
    'rc-tree',
    'rc-table',
    '@antv/x6',
    '@antv/x6-react',
  ],
}

module.exports = nextConfig