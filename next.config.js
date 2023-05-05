/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true
  },
  env: {
    APP_NAME: "Swift VISA",
    HOST: "http://127.0.0.1:3000",
    DATABASE_URL: "mongodb+srv://tefoye:tefoye2022@cluster0.uwsolat.mongodb.net/Swift_Visa",
    // DATABASE_URL: "mongodb://192.168.219.170/swift_visa",
  }
}
module.exports = nextConfig
