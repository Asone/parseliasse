# WIP: ParsEliasse

Parseliasse est un projet de création de module Typescript afin de faciliter la récupération et le traitement des données distribuées par le programme Eliasse. 

Parseliasse est construit sous `nodeJS` en `Typescript`. 

## Disclaimer

Ce projet est encore en cours de construction et n'est pour le moment pas véritablement fonctionnel. 

Une roadmap est détaillé en bas du présent document.

## Installation

pour installer `Parseliasse` dans votre projet : 

```
npm i --save parseliasse
```

### Dépendances

Le module `parseliasse` minimise au maximum l'appel à des dépendances tierces. De cette façon, celui-ci est moins exposé aux risques de bugs, de sécurité, et minimise le poids du module. 

Les dépendances utilisées à ce jour dans le module sont les suivants : 

   - `RxJs` : Afin de permettre la diffusion des flux sous forme d'observables
   - `node-fetch` : afin d'effectuer des requêtes HTTP vers les flux d'origine.


## Utilisation

### Initialisation
```typescript
    import { Parseliasse, AmendementInterface } from 'parseliasse';
    import { Subscription } from 'rxjs';

    const eliasse: Parseliasse = new Parseliasse();
    let amendements: AmendementInterface;

    const amendementSubscription: Subscription = eliasse.amdtDerouleur.observe().subscribe((amds: AmendementInterface) => {
        amendements = adms;
    });
```

le module ParsEliasse n'est pour l'instant qu'un wrapper de sous-modules spécifique pour chacun des flux d'Eliasse. Il est possible d'appeler indépendemment chaque sous module : 

```typescript 
    import { AmendementModule, AmdtDerouleurModule, DiscussionModule, ProchainADiscuterModule} from 'parseliasse'

    const amendements: AmendementModule = new AmendementModule();
    const discussion: DiscussionModule = new DiscussionModule();
    const amdtDerouleur: AmdtDerouleurModule = new AmdtDerouleurModule();
    const prochainADiscuter: ProchainADiscuterModule = new ProchainADiscuterModule();
```

### Typages

Le module ParsEliasse est entièrement typé. Les types sont embarqués dans le module et exposés afin de permettre de typer vos appels aux modules et données afin d'optimiser la cohérence de vos développements autour des données. 

Chaque flux à ses propres interfaces. Ci-dessous, la liste des types racines pour chaque flux : 


Vous pouvez trouver les interfaces dans le dossier `interfaces` du module;

### Fonctionnalités

Chaque sous-module expose le flux correspondant sous forme d'objet [observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html).

Il est possible de souscrire à l'observable via la méthode `observe` : 

```typescript
 eliasse.amdtDerouleur.observe().subscribe((result: AmendementInterface) => {
     console.log(result); // affiche le résultat
     ... // traitements supplémentaires
 });
```

## Contributions

Le projet `parseliasse` est ouvert à la communauté et toutes les contributions sont les bienvenues. 

Vous pouvez suggérer des évolutions à travers le système de tickets où proposer directement vos modifications à travers des pull-requests.

Si vous souhaitez soumettre des modifications/évolutions via une pull-request, veuillez noter les points suivants :

- Toute fonctionnalité doit être accompagnée des tests unitaires correspondants afin de garantir une maintenabilité optimale
- Le code doit être fortement typé, tant sur les inputs que les outputs pour garantir la cohérence des structures de données.
- Le code doit être documenté en respectant le format javadoc
- Le code doit fait appel le moins possible à des dépendances tierces. 


Le dépôt parseliasse est publié sur [Framagit](https://framagit.org/Asone/parseliasse) ainsi que sur [Github](https://github.com/Asone/parseliasse). 
Il est néanmoins encouragé de soumettre les tickets et les PR via Framagit. 


## Roadmap/Todo 

- Done : Créer les interfaces pour garantir les modèles de données
- Done : construire l'architecture générale du module.
- Done : Créer des tests unitaires afin de valider l'ensemble des fonctionnalités du module
- Done : créer une documentation adéquate ainsi que des exemples afin de faciliter la prise en main par des développeurs ultérieurs. 
- Todo : Compléter l'ensemble de tests afin de couvrir l'ensemble du code. 
- Todo : publier le module sur un registre npm afin d'en faciliter le déploiement
- Todo : mise en place d'une CI de validation du code et des test.
- Todo : Développer une ou des méthodes afin de faciliter la remontée de l'évolution des amendements au fil des arbitrages. 

## Licence

Module publié sous licence MIT. 

## Remerciements

Merci à :

- L'assemblée nationale pour la mise à disposition d'un flux permettant de suivre l'évolution des amendements en temps réel. 
- A Emmanuel Raviart pour son travail de construction d'outils facilitant l'accès aux données parlementaires ainsi que pour son outil équivalent à [parseliasse en python]()
- A [Regards Citoyens]() pour son travail quotidien d'évangélisation sur la nécéssité d'ouvrir les données publiques.
- A la communauté de l'open-data dans son ensemble