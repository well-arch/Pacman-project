# Arborescence du Projet Pac-Man

```
pacman-js/
│
├── index.html                 # Page principale du jeu
│
├── css/
│   ├── style.css             # Styles généraux
│   ├── menu.css              # Styles du menu
│   └── game.css              # Styles spécifiques au jeu
│
├── js/
│   ├── main.js               # Point d'entrée, initialisation du jeu
│   ├── config.js             # Configuration globale (constantes, paramètres)
│   │
│   ├── core/
│   │   ├── Game.js           # Classe principale du jeu (game loop, états)
│   │   ├── Renderer.js       # Gestion du rendu canvas
│   │   ├── InputHandler.js   # Gestion des entrées clavier/tactiles
│   │   └── CollisionDetector.js  # Détection des collisions
│   │
│   ├── entities/
│   │   ├── Pacman.js         # Classe Pac-Man
│   │   ├── Ghost.js          # Classe de base pour les fantômes
│   │   ├── Blinky.js         # Fantôme rouge (hérite de Ghost)
│   │   ├── Pinky.js          # Fantôme rose (hérite de Ghost)
│   │   ├── Inky.js           # Fantôme cyan (hérite de Ghost)
│   │   ├── Clyde.js          # Fantôme orange (hérite de Ghost)
│   │   └── Fruit.js          # Classe pour les fruits bonus
│   │
│   ├── map/
│   │   ├── Maze.js           # Classe pour le labyrinthe
│   │   ├── Cell.js           # Classe pour une cellule du labyrinthe
│   │   ├── levels.js         # Définition des niveaux (matrices)
│   │   └── Pellet.js         # Classe pour pac-gommes et super pac-gommes
│   │
│   ├── ai/
│   │   ├── PathFinder.js     # Algorithme de pathfinding (A*, BFS)
│   │   ├── GhostAI.js        # Logique IA des fantômes
│   │   └── BehaviorMode.js   # Gestion des modes (Chase, Scatter, Frightened)
│   │
│   ├── systems/
│   │   ├── ScoreManager.js   # Gestion du score et high scores
│   │   ├── LifeManager.js    # Gestion des vies
│   │   ├── LevelManager.js   # Gestion des niveaux et progression
│   │   └── PowerUpManager.js # Gestion des power-ups et timers
│   │
│   ├── ui/
│   │   ├── Menu.js           # Menu principal
│   │   ├── HUD.js            # Interface en jeu (score, vies)
│   │   ├── GameOver.js       # Écran de game over
│   │   └── Pause.js          # Menu pause
│   │
│   ├── animation/
│   │   ├── Animator.js       # Système d'animation général
│   │   ├── SpriteSheet.js    # Gestion des sprite sheets
│   │   └── Particle.js       # Système de particules (effets visuels)
│   │
│   └── utils/
│       ├── Vector2D.js       # Classe pour les vecteurs 2D
│       ├── Timer.js          # Gestionnaire de timers
│       ├── Storage.js        # Gestion du localStorage
│       └── helpers.js        # Fonctions utilitaires diverses
│
├── assets/
│   ├── images/
│   │   ├── sprites/
│   │   │   ├── pacman.png    # Sprite sheet Pac-Man
│   │   │   ├── ghosts.png    # Sprite sheet fantômes
│   │   │   ├── fruits.png    # Sprite sheet fruits
│   │   │   └── tiles.png     # Sprite sheet murs/décor
│   │   │
│   │   └── ui/
│   │       ├── logo.png      # Logo du jeu
│   │       ├── life-icon.png # Icône de vie
│   │       └── menu-bg.png   # Background du menu
│   │
│   ├── sounds/
│   │   ├── music/
│   │   │   ├── intro.mp3     # Musique d'intro
│   │   │   └── gameplay.mp3  # Musique de jeu
│   │   │
│   │   └── sfx/
│   │       ├── chomp.wav     # Son de collecte pac-gomme
│   │       ├── death.wav     # Son de mort
│   │       ├── eat-ghost.wav # Son fantôme mangé
│   │       ├── power-up.wav  # Son super pac-gomme
│   │       ├── siren.wav     # Sirène d'ambiance
│   │       └── fruit.wav     # Son collecte fruit
│   │
│   └── fonts/
│       └── arcade.ttf        # Police style arcade
│
├── data/
│   └── highscores.json       # Sauvegarde des meilleurs scores (optionnel)
│
├── docs/
│   ├── README.md             # Documentation du projet
│   ├── MECHANICS.md          # Explications des mécaniques
│   └── API.md                # Documentation de l'API interne
│
├── tests/                    # Tests (optionnel)
│   ├── unit/
│   └── integration/
│
├── .gitignore                # Fichiers à ignorer par Git
├── package.json              # Dépendances npm (si utilisé)
└── README.md                 # Documentation principale
```

## Description des Dossiers Principaux

### `/js/core/`
Le cœur du moteur de jeu. Contient la boucle de jeu principale, le système de rendu et les gestionnaires d'entrées.

### `/js/entities/`
Toutes les entités du jeu (personnages, objets). Chaque fantôme a sa propre classe pour une personnalité unique.

### `/js/map/`
Gestion du labyrinthe et de sa structure. Contient les définitions de niveaux et la logique des cellules.

### `/js/ai/`
Intelligence artificielle des fantômes. Séparé pour faciliter les ajustements et l'optimisation.

### `/js/systems/`
Systèmes de jeu (score, vies, niveaux). Ces managers coordonnent les différents aspects du gameplay.

### `/js/ui/`
Interface utilisateur et menus. Tout ce qui concerne l'affichage des informations au joueur.

### `/assets/`
Toutes les ressources externes (images, sons, polices). Organisé par type pour une gestion facile.

## Version Simplifiée (pour débuter)

Si tu veux commencer plus simple, voici une version minimaliste :

```
pacman-simple/
│
├── index.html
├── style.css
│
└── js/
    ├── game.js          # Tout le code principal
    ├── pacman.js        # Classe Pac-Man
    ├── ghost.js         # Classe Ghost
    ├── maze.js          # Gestion du labyrinthe
    └── config.js        # Constantes
```

## Recommandations

1. **Commencer simple** : Utilise la version simplifiée, puis migre vers la structure complète
2. **Architecture modulaire** : Chaque fichier a une responsabilité unique
3. **Facilité de maintenance** : Les dossiers sont organisés par fonctionnalité
4. **Scalabilité** : Facile d'ajouter de nouvelles fonctionnalités