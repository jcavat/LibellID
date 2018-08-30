# LibellID

<p align="center">
  <img width="460" height="300" src="https://github.com/jcavat/LibellID/blob/master/src/assets/img/app-logo.png">
</p>

## Projet

Cette application permet de découvrir les libellules les plus communes de Suisse romande, soit 27 espèces ou groupes d&#39;espèces (liste complète dans la rubrique « fiches infos »).



### INFORMATIONS UTILE

__Cycle de vie d'une libellule__

<p align="center">
  <img width="460" height="300" src="https://github.com/jcavat/LibellID/raw/master/src/assets/img/about1.png">
</p>

Les grandes libellules et les demoiselles

Les libellules se divisent en 2 grands groupes :

- les Anisoptères (grandes libellules)
- les Zygoptères (demoiselles)

Les Anisoptères sont robustes et se posent avec les ailes ouvertes, alors que les Zygoptères sont plus fins et se posent généralement avec les ailes fermées au repos.

| Exemple d&#39;anisoptère : Libellule à 4 taches _Libellula quadrimaculata_ | Exemple de zygoptère : Agrion jouvencelle _Coenagrion puella_ |
| --- | --- |
| ![alt text](https://github.com/jcavat/LibellID/raw/master/src/assets/img/about2.png) | ![alt text](https://github.com/jcavat/LibellID/raw/master/src/assets/img/about3.jpg) |

## Installation

1. Install [NodeJS](https://nodejs.org/en/).
2. Install [Ionic](https://ionicframework.com/getting-started#cli).
3. Clone this repository: `git clone https://github.com/MichaelPolla/VESS.git`.
4. Go into the `app` folder (`cd /vess/app`) and run `npm install`.

Mac: if you get the message `gyp: No Xcode or CLT version detected!`, you to need to execute this command line before `npm install`:
`sudo xcode-select -switch /Applications/Xcode.app/Contents/Developer/`

Running the app

`cd app`
  
Browser (not all functionalities): `ionic serve` or `ionic serve --lab`

### Android build

For complete instructions, see the Cordova [Android Platform Guide](https://cordova.apache.org/docs/en/8.x/guide/platforms/android/).  
In summary:

1. Install [Java Development Kit (JDK) 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

2. Install [Gradle](https://gradle.org/install).
3. Install [Android Studio](https://developer.android.com/studio/). This will also install the Android SDK.
4. Run: `ionic cordova run android`. This will build and run the app on a connected device, or will start the Android emulator.

### iOS build

XCode must be installed.

Install ios-deploy: `npm install -g ios-deploy`  
Build and run on emulator or connected device: `ionic cordova run ios`

## Troubleshooting

### Android build error

Android build: if you keep getting the following message although Android Studio is already installed:

```
UnhandledPromiseRejectionWarning: CordovaError: Could not find an installed version of Gradle either in Android Studio,
or on your system to install the gradle wrapper. Please include gradle
in your path, or install Android Studio
```

Install gradle: https://gradle.org/install

### iOS build error

if `npm install ios-deploy -g` fails, run: `sudo npm install --global --unsafe-perm ios-deploy` (as suggested [here](https://github.com/ios-control/ios-deploy/issues/109#issuecomment-92589783))

If you need to completely clean XCode cache, delete all the content of `Library/Developer/Xcode/DeriveData/`

## Deploying
Deploying:
Look at the documentation : [Deploying in ionic framework](https://ionicframework.com/docs/intro/deploying/)

## Run parser for libellID.json

Execute parser:

`npm run-script parser`

Execute parser before ionic serve

`npm run-script parser_serve`

Execute parser before ionic run or ionic build with android:

`npm run-script parser_run android`

`npm run-script parser_build android`

Execute parser before ionic run or ionic build with IOS:

`npm run-script parser_run ios`

`npm run-script parser_build ios`
