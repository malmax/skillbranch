NODE_ENV=production yarn run build &&
cd ./build &&
NODE_ENV=production yarn &&
cd .. &&
rsync -avz -e 'ssh -p 30022' ./build/* $SERVER_URL:www/scaryshop.ru/app &&
ssh -p 30022 $SERVER_URL 'cd www/scaryshop.ru && npm start' &&
echo 'ok'
