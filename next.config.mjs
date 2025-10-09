/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["happenings.lpu.in"], // <-- ADD THIS
  },
  // experimental: {
  //   appDir: true, // ensure App Router is enabled
  // },
  // output: "standalone",
};

export default nextConfig;
