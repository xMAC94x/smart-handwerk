# READ ALL LICENSE FILES RECURSIVE IN THIS FOLDER

```bash
find . -name "LICENSE" | /dev/yourBrain
# alternative
find . -name "LICENSE" -print0 | xargs -0 cat
```

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
8. Install all cordova plugins, if an error occurs, install the missing plugin. All current known plugins are:
```bash
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-statusbar
cordova plugin add ionic-plugin-keyboard
cordova plugin add cordova-plugin-compat
cordova plugin add cordova-plugin-x-toast
cordova prepare
```
9. Build Platform browser
```bash
ionic build android
```
10. Now Read the License like i recommented to you. I am sure you did not read it. So read it now. Just do it!
11. Run and Enjoy
```bash
ionic emulate browser
```
