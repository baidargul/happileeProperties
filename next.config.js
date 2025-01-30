/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Adjust this to a specific domain if needed
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true", // Include if credentials (cookies, etc.) are needed
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true, // Maintain image handling as is
  },
};

module.exports = nextConfig;
