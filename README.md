# LibellID
## Projet
Cette application permet de découvrir les libellules les plus communes de Suisse romande, soit 27 espèces ou groupes d&#39;espèces (liste complète dans la rubrique « fiches infos »).


**INFORMATIONS UTILES**

Cycle de vie d&#39;une libellule
![Maquettes LibellID](https://github.com/jcavat/LibellID/tree/master/src/assets/img)


Les grandes libellules et les demoiselles

Les libellules se divisent en 2 grands groupes :

- les Anisoptères (grandes libellules)
- les Zygoptères (demoiselles)

Les Anisoptères sont robustes et se posent avec les ailes ouvertes, alors que les Zygoptères sont plus fins et se posent généralement avec les ailes fermées au repos.

| Exemple d&#39;anisoptère : Libellule à 4 taches _Libellula quadrimaculata_ | Exemple de zygoptère : Agrion jouvencelle _Coenagrion puella_ |
| --- | --- |
IMG IMG


## Installation
```
npm install
ionic serve --lab (in browser)
OR
ionic run android --livereload (for emulator)
OR
ionic run android --device (for connected device)
```
## Run parser for libellID.json

Execute parser

`npm run-script parser`

Execute parser before ionic serve

`npm run-script parser_serve`

Execute parser before ionic run or ionic build with android

`npm run-script parser_run android`

`npm run-script parser_build android`

Execute parser before ionic run or ionic build with IOS

`npm run-script parser_run ios`

`npm run-script parser_build ios`


## License

