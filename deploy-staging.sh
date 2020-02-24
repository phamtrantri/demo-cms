#!/usr/bin/env sh
yarn build:staging
mv build build1
export REPOSITORY_URL=788003763789.dkr.ecr.ap-southeast-1.amazonaws.com/hospital_cms
export APP_NAME=hospital_cms
export DOCKER_PATH=docker/Dockerfile

export AWS_ACCESS_KEY_ID=AKIA3O6FPGZG2JMODV42
export AWS_SECRET_ACCESS_KEY=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
eval $(aws ecr get-login --no-include-email --region ap-southeast-1)

docker pull $REPOSITORY_URL:builder || true
docker build --target builder --cache-from $REPOSITORY_URL:builder -t $REPOSITORY_URL:builder -f $DOCKER_PATH .
docker pull $REPOSITORY_URL:staging-latest || true
docker build --cache-from $REPOSITORY_URL:builder --cache-from $REPOSITORY_URL:staging-latest -t $REPOSITORY_URL:staging-latest -f $DOCKER_PATH .
docker push $REPOSITORY_URL:builder
docker push $REPOSITORY_URL:staging-latest

ssh -i ssh_private_key ec2-user@13.251.156.15 "docker image prune -a -f"
ssh -i ssh_private_key ec2-user@13.251.156.15 "docker stop $APP_NAME || true && docker rm $APP_NAME || true"
ssh -i ssh_private_key ec2-user@13.251.156.15 "docker pull $REPOSITORY_URL:staging-latest"
ssh -i ssh_private_key ec2-user@13.251.156.15 "docker run -p 8002:80 -d --name $APP_NAME $REPOSITORY_URL:staging-latest"

rm -r build1