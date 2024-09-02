/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [ // 项目允许使用的外域白名单
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
            },
        ],
    },
    eslint: {
        // 在构建期间忽略 ESLint 错误
        ignoreDuringBuilds: true,
    },
    output: 'standalone'
};

export default nextConfig;
