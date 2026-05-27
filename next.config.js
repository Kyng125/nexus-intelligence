/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allows React Three Fiber to work without "use client" errors
  // Tells Next.js that these packages should be handled by the client bundler
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false
    }

    return config
  },
}

module.exports = nextConfig
