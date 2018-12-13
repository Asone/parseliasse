# ParsEliasse

Parseliasse est un projet de création de module Typescript afin de faciliter la récupération et le traitement des données distribuées par le programme Eliasse. 

Parseliasse est construit sous `nodeJS` en `Typescript`. 

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
        amendements = amds;
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

**Il est important de noter que pour le module `AmendementModule` doit obligatoirement avoir le paramètre numAmdt comme étant non nul et doit contenir un nombre ou un tableau de nombre pour pouvoir effectuer des requêtes** 

### Configuration & paramètres par défaut

Il est possible de configurer chaque module à l'initialisation que ce soit en instanciant chaque module séparemment ou en appelant le module global. 

Le module global prend un objet de paramétrage qui est en fait une concaténation de l'ensemble des configurations pour chaque module : 

```typescript
    const maconfig = {
        amendement: {
            cron: false,
            url: 'http://www.assemblee-nationale.fr'
            requestParams : {
                legislature: 15
            }
        },
        amdtDerouleur: {
            cron: true,
            url: 'http://www.assemblee-nationale.fr',
            ...
        },
        ...
    }

    const parseliasseInstance = new ParsEliasse(maconfig);

```

Les sous-modules peuvent également prendre un objet de paramétrage : 

```typescript
    const maconfig = {
        cron: true
    }

    const amdtDerouleur = new AdmtDerouleurModule(maconfig);
```

#### cronjobs 

les cronjobs ont les timings par défaut listés ci-dessous : 

- Flux amendement : 10 secondes
- Flux amdtDerouleur : 60 secondes
- Flux Discussion : 60 secondes
- Flux ProchainADiscuter : 10 secondes

à noter que vous pouvez lancer un cronjob avec la fonction à éxécuter ainsi que le délai de votre choix manuellement.

 e.g : 

```typescript
const discussion: DiscussionModule = new DiscussionModule();

// appelle la fonction `fetch` du module discussion toutes les 30 secondes
discussion.startjob(discussion.fetch,30);
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

- Toute fonctionnalité doit être accompagnée des tests unitaires correspondants afin de garantir une maintenabilité optimale.
- Le code doit être fortement typé, tant sur les inputs que les outputs pour garantir la cohérence des structures de données.
- Le code doit être documenté en respectant le format [javadoc](https://openclassrooms.com/fr/courses/1115306-presentation-de-la-javadoc)
- Le code doit fait appel le moins possible à des dépendances tierces. 


Le dépôt parseliasse est publié sur [Framagit](https://framagit.org/Asone/parseliasse) ainsi que sur [Github](https://github.com/Asone/parseliasse). 
Il est néanmoins encouragé de soumettre les tickets et les PR via Framagit. 

## Licence

Module publié sous licence MIT. 

## Remerciements

Merci à :

- L'assemblée nationale pour la mise à disposition d'un flux permettant de suivre l'évolution des amendements en temps réel. 
- A Emmanuel Raviart pour son travail de construction d'outils facilitant l'accès aux données parlementaires ainsi que pour son outil équivalent à [parseliasse en python](https://framagit.org/parlement-ouvert/deliasse-daemons/blob/master/aspireliasse.py)
- A [Regards Citoyens](http://www.regardscitoyens.org) pour son travail quotidien d'évangélisation sur la nécéssité d'ouvrir les données publiques.
- A la communauté de l'open-data dans son ensemble