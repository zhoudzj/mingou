# 部署
服务器需要安装nginx,mysql和redis

# 运行
## 本地运行
配置文件
本地运行需要在
config/common-local.js配置资源服务器地址

本地开发需要运行npm install nodemon -g 安装nodemon
npm run start

## 服务端运行
服务器端安装pm2
npm install pm2 -g
启动服务运行 pm2 start ecosystem.config.js


#接口文档


