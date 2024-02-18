/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: "https://webservice.torshoshirin.com/api",
    HOSTNAME: "web.torshoshirin.com",
    URL: "https://webservice.torshoshirin.com",
    MAP_API_KEY:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk4YmU4YTc5ODhjMWRlYTM3YWZhZDJlMGQ3NTZjMGEzM2M5MzFjZDIyOGQ3ZDJiY2QzNjBkMjcwN2IxNjQ4YTI1YjgwMzBjZTg5MjVmOTgyIn0.eyJhdWQiOiIyNTMxNCIsImp0aSI6Ijk4YmU4YTc5ODhjMWRlYTM3YWZhZDJlMGQ3NTZjMGEzM2M5MzFjZDIyOGQ3ZDJiY2QzNjBkMjcwN2IxNjQ4YTI1YjgwMzBjZTg5MjVmOTgyIiwiaWF0IjoxNzAyNDA5NjgyLCJuYmYiOjE3MDI0MDk2ODIsImV4cCI6MTcwNDkxNTI4Miwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.s6Et58RQVlmqmAJpJfOC24vXyuX4oIIeasL3CxKGxLBN9EL0NlVuDor5GGVVvGYUxRg3coo0b6FBYSzH3SelSI5T_2ej-Vz-hTCVVXcmJ0HGCRUY_9BuQxvOMS4b8B62kZ5fPuehWSS9t4m2ojSE2W7zcIGfBAdmUsfp7DsfnubBH0a8q7LAKN_GZhRy4pT-7TyiBlSrqsTGu5lOhggmpQEexOFkNkQUaQaBM1jPDH26Wv7GUFLx1oXhJAY7bzpCGFITqC7LSkrnsLWSgC5ejlsn_C178AIVU1Qj9L7CJqiCy4bEm0xUPSyI2Q3LpDdSqM6ags2Cuagivyv-GOApCw",
  },
  images: {
    domains: ["localhost", "web.torshoshirin.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
        port: "",
        compress: false,
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
