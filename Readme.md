# 🎮 Pac-Man JavaScript

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.ecma-international.org/ecma-262/)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

Une recréation fidèle du jeu d'arcade classique Pac-Man en JavaScript pur, utilisant HTML5 Canvas pour le rendu. Ce projet vise à reproduire les mécaniques de jeu originales avec une architecture moderne et maintenable.

![Pac-Man Demo](assets/images/ui/demo-screenshot.png)

## 📋 Table des Matières

- [Caractéristiques](#-caractéristiques)
- [Démo](#-démo)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Architecture](#-architecture)
- [Mécaniques de Jeu](#-mécaniques-de-jeu)
- [Développement](#-développement)
- [Roadmap](#-roadmap)
- [Contribution](#-contribution)
- [License](#-license)
- [Crédits](#-crédits)

## ✨ Caractéristiques

### 🎯 Gameplay Fidèle
- ✅ Labyrinthe classique 28×31 cellules
- ✅ 4 fantômes avec IA unique (Blinky, Pinky, Inky, Clyde)
- ✅ Modes de comportement authentiques (Chase, Scatter, Frightened)
- ✅ Système de scoring original
- ✅ Power-ups et fruits bonus
- ✅ Progression de difficulté par niveau

### 🎨 Visuels & Audio
- ✅ Animations fluides (Pac-Man, fantômes)
- ✅ Effets visuels (particules, transitions)
- ✅ Sprites rétro style arcade
- ✅ Sons et musiques authentiques
- ✅ Interface utilisateur responsive

### 🛠️ Technique
- ✅ JavaScript ES6+ pur (pas de framework)
- ✅ Architecture modulaire et maintenable
- ✅ Rendu optimisé avec Canvas 2D
- ✅ Support clavier et tactile
- ✅ Sauvegarde locale des high scores

## 🎬 Démo

**[▶️ Jouer en ligne](https://votre-url-demo.com)** (à déployer)

### Contrôles

| Touche | Action |
|--------|--------|
| ⬆️ ⬇️ ⬅️ ➡️ | Déplacer Pac-Man |
| `W` `A` `S` `D` | Déplacements alternatifs |
| `Espace` | Pause |
| `Échap` | Menu |
| `Entrée` | Démarrer / Confirmer |

## 🚀 Installation

### Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Un serveur web local (optionnel pour développement)

### Installation Basique

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/pacman-js.git
   cd pacman-js
   ```

2. **Ouvrir le jeu**
   ```bash
   # Option 1 : Ouvrir directement dans le navigateur
   open index.html
   
   # Option 2 : Utiliser un serveur local (recommandé)
   python -m http.server 8000
   # Puis ouvrir http://localhost:8000
   ```

### Installation avec npm (optionnel)

```bash
npm install
npm start
```

## 📖 Utilisation

### Lancer le Jeu

1. Ouvrez `index.html` dans votre navigateur
2. Cliquez sur "Nouvelle Partie" ou appuyez sur `Entrée`
3. Utilisez les flèches directionnelles pour déplacer Pac-Man
4. Collectez toutes les pac-gommes pour passer au niveau suivant
5. Évitez les fantômes (ou mangez-les après avoir pris un power-up !)

### Objectif

- **But principal :** Collecter toutes les pac-gommes du labyrinthe
- **Score :** Maximisez votre score en collectant des pac-gommes, en mangeant des fantômes et en récupérant des fruits
- **Vies :** Vous commencez avec 3 vies. Perdez-en une si un fantôme vous touche
- **Niveaux :** La difficulté augmente à chaque niveau (vitesse, comportement des fantômes)

### Système de Scoring

| Action | Points |
|--------|--------|
| Pac-gomme | 10 pts |
| Super Pac-gomme | 50 pts |
| 1er fantôme | 200 pts |
| 2ème fantôme | 400 pts |
| 3ème fantôme | 800 pts |
| 4ème fantôme | 1600 pts |
| Cerise | 100 pts |
| Fraise | 300 pts |
| Orange | 500 pts |
| Pomme | 700 pts |
| Melon | 1000 pts |

## 🏗️ Architecture

### Structure du Projet

```
pacman-js/
├── index.html             # Point d'entrée HTML
├── css/                   # Feuilles de style
├── src/
│   ├── main.js            # Initialisation
│   ├── config.js          # Configuration
│   ├── core/              # Moteur de jeu
│   ├── entities/          # Personnages (Pac-Man, fantômes)
│   ├── map/               # Gestion du labyrinthe
│   ├── ai/                # Intelligence artificielle
│   ├── systems/           # Systèmes de jeu (score, vies)
│   ├── ui/                # Interface utilisateur
│   ├── animation/         # Système d'animation
│   └── utils/             # Utilitaires
└── assets/                # Ressources (images, sons)
```

### Architecture Logicielle

```
┌─────────────────────────────────────────┐
│              Game Loop                  │
│         (requestAnimationFrame)         │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────┐           ┌────▼─────┐
│ Update │           │  Render  │
└───┬────┘           └────┬─────┘
    │                     │
    ├─ Entities           ├─ Maze
    ├─ AI                 ├─ Entities
    ├─ Collisions         ├─ UI
    ├─ Systems            └─ Effects
    └─ Input
```

### Technologies Utilisées

- **HTML5 Canvas** : Rendu 2D haute performance
- **JavaScript ES6+** : POO, modules, async/await
- **Web Audio API** : Gestion des sons
- **LocalStorage API** : Sauvegarde des scores
- **RequestAnimationFrame** : Boucle de jeu fluide

## 🎮 Mécaniques de Jeu

### Les Fantômes

Chaque fantôme a une personnalité unique et une stratégie de poursuite différente :

#### 🔴 Blinky (Rouge) - Le Chasseur
- **Comportement :** Poursuite directe et agressive
- **Cible :** Position exacte de Pac-Man
- **Caractère :** Prévisible mais dangereux

#### 🩷 Pinky (Rose) - L'Embusqueur
- **Comportement :** Tente de couper le chemin
- **Cible :** 4 cases devant Pac-Man
- **Caractère :** Stratégique et calculateur

#### 🩵 Inky (Cyan) - Le Versatile
- **Comportement :** Comportement complexe et imprévisible
- **Cible :** Calcul basé sur Blinky et Pac-Man
- **Caractère :** Changeant et difficile à anticiper

#### 🧡 Clyde (Orange) - Le Timide
- **Comportement :** Alterne entre poursuite et fuite
- **Cible :** Pac-Man si loin, son coin si proche
- **Caractère :** Imprévisible et erratique

### Modes de Comportement

1. **Chase (Poursuite)** : Les fantômes chassent activement Pac-Man
2. **Scatter (Dispersion)** : Les fantômes retournent dans leurs coins
3. **Frightened (Vulnérable)** : Les fantômes deviennent bleus et fuient après un power-up
4. **Eyes (Retour)** : Les fantômes retournent à leur maison après avoir été mangés

### Progression de Difficulté

À chaque niveau :
- ⚡ Vitesse des fantômes augmente
- ⏱️ Durée du mode Frightened diminue
- 🎯 Comportement des fantômes devient plus agressif
- 🍎 Nouveaux fruits avec plus de points

## 💻 Développement

### Configuration de l'Environnement

```bash
# Cloner le projet
git clone https://github.com/votre-username/pacman-js.git
cd pacman-js

# Installer les dépendances (si npm utilisé)
npm install

# Lancer en mode développement
npm run dev
```

### Structure des Fichiers Clés

#### `src/main.js`
Point d'entrée principal qui initialise le jeu.

```javascript
import Game from './core/Game.js';
import config from './config.js';

window.addEventListener('DOMContentLoaded', () => {
  const game = new Game(config);
  game.init();
  game.start();
});
```

#### `src/config.js`
Configuration centralisée du jeu.

```javascript
export default {
  canvas: {
    width: 448,
    height: 496
  },
  cell: {
    size: 16
  },
  speeds: {
    pacman: 1.0,
    ghost: 0.75,
    frightened: 0.5
  },
  // ... autres configurations
};
```

### Ajouter un Nouveau Niveau

1. Créez une matrice 28×13 dans `src/map/levels.js`
2. Définissez les paramètres du niveau
3. Enregistrez le niveau dans l'export

```javascript
export const level2 = {
  id: 2,
  grid: [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    // ... 13 autres lignes
  ],
  ghostSpeed: 0.8,
  frightDuration: 5000
};
```

### Tests

```bash
# Lancer les tests unitaires
npm test

# Lancer les tests avec couverture
npm run test:coverage

# Tests d'intégration
npm run test:integration
```

### Build de Production

```bash
# Créer une version optimisée
npm run build

# Les fichiers seront dans le dossier /dist
```

## 🗺️ Roadmap

### Version 1.0 (Actuelle)
- [x] Gameplay de base fonctionnel
- [x] 4 fantômes avec IA
- [x] Système de scoring
- [x] Interface utilisateur
- [x] Sons et animations

### Version 1.1 (Prochaine)
- [ ] Mode multijoueur local (2 joueurs)
- [ ] Niveaux additionnels
- [ ] Personnalisation des contrôles
- [ ] Statistiques détaillées
- [ ] Modes de difficulté

### Version 2.0 (Future)
- [ ] Mode en ligne avec leaderboard global
- [ ] Éditeur de niveaux
- [ ] Skins personnalisables
- [ ] Achievements/Trophées
- [ ] Mode "endless"

### Idées en Réflexion
- [ ] Support mobile amélioré
- [ ] Mode tournoi
- [ ] Replay des parties
- [ ] AI vs AI mode
- [ ] Level génération procédurale

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

### Comment Contribuer

1. **Fork** le projet
2. **Créez** une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### Guidelines

- Respectez le style de code existant
- Ajoutez des tests pour les nouvelles fonctionnalités
- Mettez à jour la documentation si nécessaire
- Décrivez clairement vos changements dans la PR

### Code Style

```javascript
// ✅ Bon
class Ghost {
  constructor(x, y, color) {
    this.position = { x, y };
    this.color = color;
  }
  
  update(deltaTime) {
    // logique
  }
}

// ❌ Éviter
class ghost {
  constructor(x,y,color){
    this.x=x;
    this.y=y;
  }
}
```

### Rapporter des Bugs

Utilisez les [Issues GitHub](https://github.com/well-arch/pacman-js/issues) en précisant :
- Description du bug
- Steps pour le reproduire
- Comportement attendu vs observé
- Screenshots si applicable
- Informations système (navigateur, OS)

## 📄 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License

Copyright (c) 2025 Votre Abel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

## 🙏 Crédits

### Créateurs Originaux
- **Toru Iwatani** - Créateur original de Pac-Man (1980)
- **Namco/Bandai Namco Entertainment** - Détenteur des droits

### Ressources & Inspirations
- [The Pac-Man Dossier](https://www.gamasutra.com/view/feature/3938/the_pacman_dossier.php) - Documentation complète des mécaniques
- [MDN Web Docs](https://developer.mozilla.org/) - Documentation Canvas API
- [OpenGameArt](https://opengameart.org/) - Assets graphiques

### Outils Utilisés
- [Visual Studio Code](https://code.visualstudio.com/) - Éditeur de code
- [Aseprite](https://www.aseprite.org/) - Création de sprites
- [Audacity](https://www.audacityteam.org/) - Édition audio
- [Git](https://git-scm.com/) - Contrôle de version

### Remerciements Spéciaux
- Communauté JavaScript pour l'inspiration
- Testeurs bêta pour leurs retours précieux
- Tous les contributeurs du projet

---

## 📞 Contact & Support

- **Auteur :** Abel TIENE
- **Email :** tieneabel04@gmail.com

### Support

Si vous aimez ce projet, n'hésitez pas à :
- ⭐ Star le repository
- 🐛 Rapporter des bugs
- 💡 Proposer des améliorations
- 🔀 Contribuer au code
- 📢 Partager le projet

---

<p align="center">
  Fait avec ❤️ et beaucoup de ☕
</p>

<p align="center">
  <sub>Projet éducatif - Pas d'affiliation avec Namco/Bandai Namco</sub>
</p>
