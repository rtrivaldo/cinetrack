/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "image.tmdb.org" }],
    },
};

export default nextConfig;
