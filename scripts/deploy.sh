#!/bin/bash
BRANCH=$1
APP_DIR=/var/www/nextjs-app
BUILD_ZIP=build.zip

echo "Deploying $1 environment..."

# 디렉토리가 없을 때 최초 실행시켜서 ec2 유저로 권한 부여.
if [ ! -d "$APP_DIR"]; then
  echo "Creating application directory..."
  sudo mkdir -p $APP_DIR
  sudo chown -R ec2-user:ec2-user $APP_DIR
fi

echo "Stopping existing application..."
pm2 delete nextjs || true

echo "Copying new file..."
rm -rf $APP_DIR/*
cp -r ~/app/* $APP_DIR/

cd $APP_DIR
echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Starting application with PM2.."
pm2 start npm --name "nextjs" -- start -- -p $([ "$BRANCH" == "prod" ] && echo 3000 || echo 3001)

echo "Deployment completed!"