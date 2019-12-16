#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'doc.findream.vip' > CNAME

git init
git add -A
git commit -m 'deploy blog'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  主页必须发布到master分支
git push -f git@github.com:224137748/224137748.github.io.git master

cd ../../../
git add -A
git commit -m 'doc updated'
# 将文档内容发布到 document 分支
git push -f git@github.com:224137748/224137748.github.io.git document:document

cd -