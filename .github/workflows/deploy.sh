echo hello world 
cd Bigbee-front
ls
git pull
cd app
npm run build
sudo cp -rf ./build/* /var/www/bigbee.mnogosushi.kg/
ls
sudo systemctl restart nginx
echo Successfully 