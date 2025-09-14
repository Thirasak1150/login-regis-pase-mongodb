/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  telemetry: false,
  experimental: {
    outputStandalone: true,
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