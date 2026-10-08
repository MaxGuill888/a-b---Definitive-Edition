# a:b Definitive Edition

La version finale de a:b, une page web immersive inspirée d'un bureau d'ordinateur, conçue pour centraliser vos activités en ligne dans un environnement unique, personnalisable et compatible avec les environnements de type Blocksi / filtrage web.

## Présentation

a:b Definitive Edition est un projet HTML/CSS/JS qui transforme une simple page web en un faux environnement de bureau avec :

- un écran d'accueil stylé
- un dock d'applications
- des fenêtres flottantes redimensionnables
- un centre de notifications
- un gestionnaire d'applications personnalisées
- un magasin d'applications intégré
- des paramètres de personnalisation
- une structure facilement extensible pour ajouter des modules ou liens web

Il a été pensé pour fonctionner comme une "page de démarrage" ou un portail de navigation centralisé avec une expérience visuelle proche d'un système d'exploitation.

## Fonctionnalités principales

### 1. Bureau web simulé
- grille d'applications dynamique
- icônes et fenêtres arrondies
- taille adaptative selon la fenêtre du navigateur
- profondeur visuelle avec fond d'écran, thème sombre et clair

### 2. Dock et lancement d'applications
- accès rapide aux apps depuis un dock en bas de l'écran
- ouverture de fenêtres d'applications directement depuis le bureau
- gestion intuitive des fenêtres : réduction, agrandissement, fermeture
- déplacement et redimensionnement par glisser-déposer

### 3. Centre de notifications
- système de notifications internes
- indicateur de messages non lus
- panneau de notifications accessible depuis le bouton dédié
- historique visuel des alertes

### 4. App Store intégré
- ajout d'applications via URL ou fichier HTML local
- détection automatique du titre et de l'icône
- recherche dans les applications installées
- ouverture, suppression et gestion des apps ajoutées

### 5. Paramètres personnalisables
- changement de thème : sombre / clair
- affichage de l'heure en format 24h ou 12h
- option pour afficher les secondes
- suppression de toutes les apps enregistrées

### 6. Persistance locale
- sauvegarde des apps et paramètres dans `localStorage`
- conservation de la configuration entre les rechargements
- possibilité d'ajouter des outils sans backend

### 7. Modules système inclus
Les applications système présentes dans le dépôt incluent :
- Paramètres
- App Store
- Navigateur Scramjet avec choix du transport et de serveurs Wisp publics ou personnalisés
- Chat
- AI

### 8. Compatibilité GitHub Pages
Le dépôt est prêt à être déployé via GitHub Pages, avec une page de redirection vers le bureau principal.

## Structure du projet

```text
.
├── LICENSE
├── README.md
├── CNAME
├── launch.html
└── src/
    ├── index.html
    └── apps/
        ├── Ai/
        │   └── Ai.html
        ├── Browser/
        │   ├── Browser.html
        │   ├── sw.js
        │   ├── icons/Browser.svg
        │   └── vendor/
        │       ├── NOTICE.txt
        │       ├── bare-mux/
        │       └── scramjet/
        ├── Chat/
        │   └── Chat.html
        ├── Settings/
        │   └── Settings.html
        └── Store/
            └── Store.html
```

## Démarrage rapide

### Option 1 : ouvrir directement le projet
- ouvrez `launch.html` dans un navigateur
- ou ouvrez directement `src/index.html`

### Option 2 : déploiement GitHub Pages
1. poussez le dépôt sur GitHub
2. activez GitHub Pages
3. choisissez la branche principale
4. ouvrez la page publique

La page `launch.html` redirige automatiquement vers :

```text
src/index.html
```

## Utilisation

### Bureau principal
Le fichier `src/index.html` est le cœur du projet. Il gère :
- le fond d'écran
- le dock inférieur
- la grille des applications
- la création des fenêtres
- les interactions clavier/souris
- les notifications
- le thème et les paramètres du système

### App Store
L'App Store permet d'ajouter des liens ou fichiers HTML en tant qu'applications personnalisées. Ces apps sont ensuite affichées dans le bureau et peuvent être ouvertes comme des fenêtres.

### Paramètres
La section Paramètres permet de personnaliser l'apparence globale du bureau et de gérer les apps installées.

### Navigateur
Le Navigateur utilise Scramjet et un service worker pour relayer les requêtes, avec un choix de transport (Epoxy/Wisp, libcurl/Wisp ou Bare Server). Il propose les serveurs Wisp publics listés par YukiOS, ainsi que la saisie d'une adresse Wisp ou Bare Server personnelle. Les modules de transport Epoxy, libcurl et Bare Server sont chargés depuis jsDelivr lors de leur sélection.

Le proxy nécessite un contexte sécurisé (HTTPS, par exemple GitHub Pages, ou `localhost`) : il ne fonctionne pas depuis `file://` ni depuis l'installateur local qui ouvre une page `blob:`. Les serveurs publics sont tiers ; disponibilité, latence et règles d'utilisation peuvent changer. Un proxy peut voir les domaines visités et le trafic qu'il relaie : ne saisis pas d'informations sensibles sur un serveur auquel tu ne fais pas confiance. Scramjet ne garantit pas la compatibilité de tous les sites.

Le runtime Scramjet et BareMux est fourni dans `src/apps/Browser/vendor/` avec ses fichiers de licence et d'attribution.

## Notes de conception

- Le projet est entièrement frontal (HTML/CSS/JS)
- Il dépend de `localStorage` pour la sauvegarde
- Il est conçu pour être simple à modifier et à étendre
- Il est adapté à un usage de portail de navigation personnel ou éducatif

## Limitations

- Il ne s'agit pas d'un système d'exploitation complet
- Les pages d'AI et de Chat sont des modules de base et peuvent être enrichis
- Les applications installées sont principalement des fenêtres iframe ou des liens externes
- Les modes Wisp et Bare Server nécessitent un serveur compatible ; GitHub Pages héberge le client mais n'exécute pas le serveur proxy

## Licence

Ce projet est distribué sous la licence GNU GPL v3.0.

Voir le fichier `LICENSE` pour plus de détails.

## À propos

a:b Definitive Edition vise à fournir une interface web unique, intuitive et personnalisable pour regrouper les outils, liens et applications les plus utilisés dans un environnement visuel cohérent.

---

Version du projet : Final Edition
Type : Web UI / faux bureau / portail d'applications
Technologies : HTML, CSS, JavaScript

“Un bureau web personnalisé, centralisé et prêt à évoluer.”




































