/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,

  },
  env: {
    APP_NAME: "Swift VISA",
    // DATABASE_URL: "mongodb+srv://tefoye:tefoye2022@cluster0.uwsolat.mongodb.net/Swift_Visa",
    // DATABASE_URL: "mongodb://admin:password@localhost:27017/sv",
    NOREPLY_EMAIL: "swift.visa237@gmail.com",
    GMAIL_PASSWORD: "lxbvivzjizrvecde",
    DATABASE_URL: "postgres://default:D51lyHCSGpvU@ep-plain-bonus-066356-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15"
  },
  images: {
    domains: ["firebasestorage.googleapis.com"]
  }
}
module.exports = nextConfig
