# 使用官方的 Node.js 镜像作为基础镜像
FROM node:20 AS frontend

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY my-app/package*.json ./

# 安装依赖
RUN npm install

# 复制应用代码
COPY my-app/ .

# 构建应用
RUN npm run build

# 使用官方的 Python 镜像作为基础镜像
FROM python:3.10 AS backend

# 设置工作目录
WORKDIR /usr/src/app

# 复制后端代码
COPY backEnd/ .

# 安装依赖
RUN pip install -r requirements.txt

# 暴露端口
EXPOSE 5000

# 启动后端服务
CMD ["python", "main.py"]