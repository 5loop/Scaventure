## Mobile Set-Up

**Requirements** 
OS:

- preferably ***NIX** dev environment 

**Tools** 

- Node 
- react-native
- Expo
  - Follow Installation Instructions : https://docs.expo.io/versions/latest/introduction/installation.html
  - Expo XDE
- Latest Android SDK
- Genymotion (free for personal use ) (if you don’t have android device or you want to use emulator)
- PlayStore: [Expo app](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en) (you do have android device)


## Running App

Install NPM dependencides 
`cd /path/to/scaventure-mobile` 
`npm install` 
`npm install eslint -g`

To use linter

`npm run lint`

Auto-Fix linter errors

`npm run lint:fix`

You can run the app by 

- using emulator (Genymotion)
- connecting android device to the computer
- using EXPO app on your device (wireless)

**XDE** 

- Clone the mobile setup repo  
- Open up XDE application (on linux I had to run binary as  ./xde-2.22.1-x86_64.AppImage) 
- (Register / Login)
- Connect android device / open Genymotion emulator & start vm 
- click ‘Project’ → ‘Open Project’ → path/to/scaventure-mobile
- click ‘Device’ → ‘Open on Android’

**Using Exp CLI** 

- `cd /path/to/scaventure-mobile` 
- `exp start` 
- Open EXPO app on your mobile device
- Scan QR displayed on screen with your mobile phone 
