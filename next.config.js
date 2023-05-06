/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true
  },
  env: {
    APP_NAME: "Swift VISA",
    HOST: "http://127.0.0.1:3000",
    // DATABASE_URL: "mongodb+srv://tefoye:tefoye2022@cluster0.uwsolat.mongodb.net/Swift_Visa",
    // DATABASE_URL: "mongodb://admin:password@localhost:27017/sv",
    DATABASE_URL: "postgresql://admin:password@localhost:5433/sv"
  }
}
module.exports = nextConfig
