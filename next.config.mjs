/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // 최적화 기능을 끄면 도메인 제약이 느슨해집니다.
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;
