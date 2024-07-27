/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "veiozliamnyiomtxrfsa.supabase.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
