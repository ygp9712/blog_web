# 使用官方的 Node.js 镜像作为基础镜像
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 以利用缓存
COPY package*.json ./

# 安装依赖项
RUN npm install

# 复制所有文件到工作目录
COPY . .

# 构建 Next.js 应用
RUN npm run build

# 使用一个较小的镜像来运行构建后的应用
FROM node:18-alpine AS runner

WORKDIR /app

# 将构建阶段生成的文件复制到 runner 镜像中
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# 设置环境变量，NEXT_PUBLIC_ 前缀的变量会在客户端生效
ENV NODE_ENV production
ENV PORT 4000

# 暴露端口
EXPOSE 4000

# 启动 Next.js 应用
CMD ["npm", "run", "start"]