/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        api: process.env.api,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
    }
}

module.exports = nextConfig
