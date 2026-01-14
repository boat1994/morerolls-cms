import { withPayload } from '@payloadcms/next/withPayload'
import process from 'node:process'

import type { NextConfig } from 'next'

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Your Next.js config here
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          process.env.NEXT_PUBLIC_R2_HOSTNAME || 'pub-ce68ca97bac342d383f6284fff969191.r2.dev',
        port: '',
        pathname: '/**', // อนุญาตทุก Path
      },
    ],
  },
  webpack: (webpackConfig: any, { isServer }: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Externalize node:http and node:http2 for Cloudflare Workers compatibility
    // These modules are not available in the Cloudflare Workers runtime
    if (!isServer) {
      webpackConfig.externals = webpackConfig.externals || []
      if (Array.isArray(webpackConfig.externals)) {
        webpackConfig.externals.push({
          'node:http': 'commonjs node:http',
          'node:http2': 'commonjs node:http2',
          'http': 'commonjs http',
          'http2': 'commonjs http2',
        })
      }
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
