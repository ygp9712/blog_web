/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [ // 项目允许使用的外域白名单
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
            },
        ],
    }
};

export default nextConfig;
