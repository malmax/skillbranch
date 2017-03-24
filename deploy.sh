NODE_ENV=production yarn run build &&
cd ./build &&
NODE_ENV=production yarn &&
cd .. &&
ssh -p 30022 $SERVER2_URL 'cd www/gplanet.ru && rm -rf ./*' &&
rsync -avz -e 'ssh -p 30022' ./build/* $SERVER2_URL:www/gplanet.ru/ &&
ssh -p 30022 $SERVER2_URL 'cd www/gplanet.ru && npm start' &&
echo 'ok'
