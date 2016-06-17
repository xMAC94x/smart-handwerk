#Setting up

1. Install node.js current 6.1.0
2. Install cordova
```bash
npm install -g cordova
```
3. Install your IDE like Webstorm
4. Open Node.js Command Prompt
5. Change Directory to the Project Directory src/Frontend
```bash
cd <Your Git smart-handwerk Folder>
cd src/Frontend
```
6. Add Platform browser and android
```bash
ionic platform add browser
ionic platform add android
```
7. Install bower
```bash
npm install -b bower
```
7. Install all cordova plugins, if an error occurs, install the missing plugin. All current known plugins are:
```bash
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-statusbar
cordova plugin add ionic-plugin-keyboard
cordova plugin add cordova-plugin-compat
```
9. Build Platform browser
```bash
ionic build android
```
10. Run and Enjoy
```bash
ionic emulate browser
```