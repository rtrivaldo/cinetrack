/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/movie/movie/:id",
                destination: "/movie/:id",
                permanent: true, // Use `true` if it's a permanent redirect, otherwise `false`
            },
        ];
    },
    images: {
        remotePatterns: [{ hostname: "image.tmdb.org" }],
    },
};

export default nextConfig;
