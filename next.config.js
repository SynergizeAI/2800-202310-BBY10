/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        swcPlugins: [
            ["next-superjson-plugin", {}]
        ]
    },
    images: {
        domains: [
          'res.cloudinary.com', 
          'avatars.githubusercontent.com',
          'raw.githubusercontent.com',
          'lh3.googleusercontent.com',
          'cataas.com'
        ]
      }
    }
    
    module.exports = nextConfig
