# Documentation des Fichiers - Projet Pac-Man

## 📄 Fichiers Racine

### `index.html`
Fichier HTML principal qui contient la structure de la page du jeu. Inclut l'élément canvas pour le rendu du jeu, les liens vers les styles CSS et les scripts JavaScript. Configure également les métadonnées et le titre de la page.

### `package.json`
Fichier de configuration npm (optionnel). Définit les dépendances du projet, les scripts de build, les informations du projet (nom, version, auteur) et les commandes de développement.

### `.gitignore`
Liste les fichiers et dossiers à ignorer par Git (node_modules, fichiers de config locaux, fichiers temporaires, etc.). Évite de versionner des fichiers inutiles.

### `README.md`
Documentation principale du projet. Contient la description générale, les instructions d'installation, les commandes pour lancer le jeu, les technologies utilisées et les crédits.

---

## 🎨 Dossier `/css/`

### `style.css`
Styles globaux de l'application. Définit les reset CSS, les polices, les couleurs principales, le positionnement du canvas et les styles de base pour l'ensemble du projet.

### `menu.css`
Styles spécifiques aux menus (menu principal, menu pause). Gère les animations des boutons, les transitions, les backgrounds et la mise en page des écrans de menu.

### `game.css`
Styles pour les éléments du jeu en cours. Inclut le positionnement du HUD (score, vies), les overlays de pause/game over, et les styles des messages temporaires (READY!, GAME OVER).

---

## 💻 Dossier `/js/`

### `main.js`
**Point d'entrée principal de l'application.** Initialise le jeu au chargement de la page, configure le canvas, crée l'instance principale de Game, démarre la boucle de jeu et gère les événements globaux (resize, visibility).

### `config.js`
**Configuration globale du jeu.** Contient toutes les constantes : dimensions du canvas, taille des cellules, vitesses des personnages, scores, timers, couleurs, et paramètres de difficulté par niveau. Point unique pour ajuster le gameplay.

---

## 🎮 Dossier `/js/core/`

### `Game.js`
**Classe principale du jeu - Le chef d'orchestre.** Gère la boucle de jeu (game loop), les états du jeu (menu, playing, paused, gameover), coordonne tous les systèmes, gère les transitions entre états, et orchestre l'update et le render de tous les éléments.

**Méthodes clés :**
- `init()` : Initialise tous les systèmes
- `update(deltaTime)` : Met à jour la logique du jeu
- `render()` : Déclenche le rendu de tous les éléments
- `gameLoop()` : Boucle principale avec requestAnimationFrame

### `Renderer.js`
**Moteur de rendu.** Gère tout le dessin sur le canvas : efface l'écran, dessine le labyrinthe, les personnages, les effets visuels, et le HUD. Optimise le rendu pour éviter les redraws inutiles. Gère les transformations et les layers de rendu.

**Responsabilités :**
- Rendu du labyrinthe et des murs
- Affichage des entités (Pac-Man, fantômes)
- Rendu des effets visuels et animations
- Gestion des caméras et du viewport

### `InputHandler.js`
**Gestionnaire des entrées utilisateur.** Écoute et traite les événements clavier (touches fléchées, WASD, Espace, Échap), les événements tactiles pour mobile, et les clics de souris. Maintient l'état des touches pressées et gère la file de directions pour Pac-Man.

**Fonctionnalités :**
- Détection multi-touches
- Support tactile (swipe)
- Queue de directions
- Prévention des actions par défaut

### `CollisionDetector.js`
**Système de détection de collisions.** Vérifie les collisions entre Pac-Man et les murs, entre Pac-Man et les fantômes, entre Pac-Man et les pac-gommes/fruits. Gère également les collisions fantômes-murs. Utilise des bounding boxes et des vérifications par grille.

**Méthodes principales :**
- `checkWallCollision(entity, direction)` : Vérifie si le mouvement est possible
- `checkPacmanGhostCollision()` : Détecte les rencontres
- `checkPelletCollection()` : Vérifie la collecte des pac-gommes
- `isWalkable(x, y)` : Teste si une cellule est accessible

---

## 👻 Dossier `/js/entities/`

### `Pacman.js`
**Classe du personnage joueur.** Gère la position, la direction, le mouvement, l'animation de la bouche (ouverture/fermeture), les états (normal, invincible après mort), la détection de collecte, et les effets visuels. Implémente le système de mouvement sur grille avec transition fluide.

**Propriétés :**
- `x, y` : Position sur la grille
- `direction` : Direction actuelle (UP, DOWN, LEFT, RIGHT)
- `nextDirection` : Direction demandée par le joueur
- `speed` : Vitesse de déplacement
- `mouthAngle` : Angle d'ouverture de la bouche (animation)
- `lives` : Nombre de vies restantes

**Méthodes :**
- `update(deltaTime)` : Met à jour position et animation
- `changeDirection(newDirection)` : Tente de changer de direction
- `die()` : Animation et logique de mort
- `reset()` : Repositionne après une mort

### `Ghost.js`
**Classe de base abstraite pour les fantômes.** Définit les propriétés communes : position, couleur, vitesse, mode actuel (Chase, Scatter, Frightened, Eyes), target (cellule cible), et les méthodes communes de mouvement et de rendu. Toutes les classes de fantômes héritent de celle-ci.

**États possibles :**
- CHASE : Poursuit Pac-Man selon sa stratégie
- SCATTER : Retourne à son coin
- FRIGHTENED : Vulnérable, mouvement aléatoire
- EYES : Retour à la maison après avoir été mangé

**Méthodes abstraites :**
- `calculateChaseTarget()` : À implémenter par chaque fantôme

### `Blinky.js` (Fantôme Rouge)
**Le chasseur agressif.** Hérite de Ghost. Implémente une stratégie de poursuite directe : cible toujours la position exacte de Pac-Man. C'est le plus rapide et le plus prévisible. En mode Scatter, va dans le coin supérieur droit.

**Stratégie Chase :** Cible directement les coordonnées de Pac-Man.

### `Pinky.js` (Fantôme Rose)
**L'embusqueur.** Hérite de Ghost. Stratégie d'anticipation : cible 4 cases devant Pac-Man (dans sa direction actuelle). Tente de couper le chemin du joueur. En mode Scatter, va dans le coin supérieur gauche.

**Stratégie Chase :** Cible 4 cellules devant Pac-Man (position + 4 × direction).

### `Inky.js` (Fantôme Cyan)
**Le calculateur.** Hérite de Ghost. Stratégie complexe : utilise la position de Blinky ET de Pac-Man. Calcule un vecteur depuis Blinky vers 2 cases devant Pac-Man, puis le double. Comportement imprévisible. En mode Scatter, va dans le coin inférieur droit.

**Stratégie Chase :** 
1. Trouve 2 cases devant Pac-Man
2. Crée un vecteur de Blinky vers ce point
3. Double ce vecteur pour trouver la cible

### `Clyde.js` (Fantôme Orange)
**Le timide.** Hérite de Ghost. Stratégie conditionnelle : si loin de Pac-Man (>8 cases), se comporte comme Blinky. Si proche (<8 cases), fuit vers son coin (Scatter). Comportement erratique et imprévisible. En mode Scatter, va dans le coin inférieur gauche.

**Stratégie Chase :** 
- Si distance > 8 cellules : cible Pac-Man directement
- Si distance ≤ 8 cellules : fuit vers coin scatter

### `Fruit.js`
**Classe des fruits bonus.** Gère l'apparition des fruits au centre du labyrinthe, leur durée de vie (disparition après quelques secondes), leur valeur en points (100 à 5000 selon le niveau), et leur animation. Différents fruits selon le niveau (cerise, fraise, orange, pomme, melon, galaxian, cloche, clé).

**Propriétés :**
- `type` : Type de fruit (détermine sprite et valeur)
- `points` : Valeur en points
- `lifetime` : Durée d'apparition
- `position` : Centre du labyrinthe

---

## 🗺️ Dossier `/js/map/`

### `Maze.js`
**Gestion complète du labyrinthe.** Charge les données de niveau, construit la matrice du labyrinthe, gère les pac-gommes et super pac-gommes, détecte les cases accessibles, gère le tunnel de téléportation gauche-droite, et fournit des méthodes pour interroger l'état du labyrinthe. Dessine les murs avec leur style distinctif.

**Méthodes principales :**
- `loadLevel(levelData)` : Charge une nouvelle grille
- `getCellType(x, y)` : Retourne le type de cellule
- `isWalkable(x, y)` : Vérifie si accessible
- `collectPellet(x, y)` : Collecte une pac-gomme
- `getPelletCount()` : Compte les pac-gommes restantes
- `draw(renderer)` : Dessine le labyrinthe

### `Cell.js`
**Représentation d'une cellule du labyrinthe.** Définit le type de cellule (vide, mur, pac-gomme, super pac-gomme, porte), son état (active/collectée), ses propriétés visuelles, et les méthodes de rendu. Permet une gestion granulaire de chaque case.

**Types de cellules :**
- EMPTY (0) : Case vide
- WALL (1) : Mur solide
- PELLET (2) : Pac-gomme normale (10 points)
- POWER_PELLET (3) : Super pac-gomme (50 points)
- GHOST_DOOR (4) : Porte de la maison des fantômes

### `levels.js`
**Définition des niveaux du jeu.** Contient les matrices 2D représentant chaque niveau (28×31 pour la version classique), les configurations spécifiques par niveau (vitesse, comportements), et potentiellement plusieurs labyrinthes différents. Format simple à éditer pour créer de nouveaux niveaux.

**Structure d'un niveau :**
```javascript
{
  id: 1,
  name: "Classic",
  grid: [ /* matrice 28x31 */ ],
  ghostSpeed: 0.75,
  pacmanSpeed: 1.0,
  frightDuration: 6000
}
```

### `Pellet.js`
**Classe pour les pac-gommes.** Différencie les pac-gommes normales (petites, 10 points) et les super pac-gommes (grandes, 50 points), gère leur animation (clignotement pour les super), leur état (collectée ou non), et leur rendu. Peut inclure des effets visuels lors de la collecte.

**Types :**
- Normal : Petit point blanc, statique
- Power : Gros point blanc, animation pulsante

---

## 🤖 Dossier `/js/ai/`

### `PathFinder.js`
**Algorithmes de recherche de chemin.** Implémente A* (A-star) pour un pathfinding optimal, BFS (Breadth-First Search) comme alternative plus simple, calcule les distances entre points, gère les heuristiques, et optimise les performances avec des caches. Utilisé par les fantômes pour naviguer vers leurs cibles.

**Algorithmes :**
- `findPath(start, end, maze)` : Trouve le chemin optimal (A*)
- `getNextDirection(from, to)` : Retourne la prochaine direction
- `calculateDistance(pos1, pos2)` : Distance euclidienne ou Manhattan

### `GhostAI.js`
**Contrôleur d'intelligence artificielle des fantômes.** Coordonne les comportements de tous les fantômes, gère les transitions entre modes, synchronise les timings (alternance Chase/Scatter), calcule les cibles pour chaque fantôme selon leur personnalité, et ajuste la difficulté selon le niveau. Point central de la stratégie des fantômes.

**Responsabilités :**
- Synchronisation des modes de tous les fantômes
- Gestion des timers (7s chase, 20s scatter, etc.)
- Coordination des stratégies individuelles
- Ajustement de difficulté

### `BehaviorMode.js`
**Énumération et logique des modes de comportement.** Définit les modes CHASE (poursuite), SCATTER (dispersion), FRIGHTENED (vulnérable), et EYES (retour maison). Gère les durées de chaque mode, les transitions, les effets visuels associés, et les modificateurs de vitesse. Implémente la séquence de modes du jeu original.

**Séquence standard :**
1. Scatter 7s
2. Chase 20s
3. Scatter 7s
4. Chase 20s
5. Scatter 5s
6. Chase (infini)

---

## ⚙️ Dossier `/js/systems/`

### `ScoreManager.js`
**Gestion complète du système de score.** Calcule les points pour chaque action (pac-gommes : 10, super pac-gommes : 50, fantômes : 200/400/800/1600, fruits : variable), gère le multiplicateur lors de la consommation de plusieurs fantômes, sauvegarde et charge les high scores (localStorage), déclenche les vies bonus (ex: 10000 points), et affiche les animations de score.

**Fonctionnalités :**
- `addPoints(amount, x, y)` : Ajoute des points avec animation
- `resetGhostMultiplier()` : Reset après fin du power-up
- `getHighScore()` : Récupère le meilleur score
- `checkExtraLife()` : Vérifie si bonus de vie atteint

### `LifeManager.js`
**Système de gestion des vies.** Suit le nombre de vies restantes (commence à 3), gère la perte de vie, déclenche l'animation de mort de Pac-Man, réinitialise les positions après mort, gère le game over quand plus de vies, et affiche visuellement les vies dans le HUD.

**Méthodes :**
- `loseLife()` : Déclenche séquence de mort
- `addLife()` : Ajoute une vie bonus
- `getRemainingLives()` : Nombre de vies actuelles
- `isGameOver()` : Vérifie si partie terminée

### `LevelManager.js`
**Gestion de la progression des niveaux.** Détecte la victoire (toutes pac-gommes collectées), charge le niveau suivant, augmente progressivement la difficulté (vitesses, comportements), gère les animations de transition, sauvegarde la progression, et configure les paramètres spécifiques de chaque niveau.

**Progression de difficulté :**
- Vitesse des fantômes augmente
- Durée du mode Frightened diminue
- Temps en mode Scatter réduit
- Nouveaux fruits apparaissent

### `PowerUpManager.js`
**Gestion des power-ups (super pac-gommes).** Active le mode Frightened des fantômes, gère le timer du power-up (6-8 secondes), fait clignoter les fantômes avant fin du mode, ralentit les fantômes, accumule les multiplicateurs de points, et coordonne les effets visuels et sonores.

**Comportements :**
- Active Frightened sur tous les fantômes
- Lance timer de 6000ms
- Gère multiplicateur (200 → 400 → 800 → 1600)
- Clignotement fantômes à 2s restantes
- Reset à l'expiration

---

## 🖥️ Dossier `/js/ui/`

### `Menu.js`
**Interface du menu principal.** Affiche le titre du jeu, les options (Nouvelle partie, Continuer, Options, High Scores), gère la navigation au clavier/souris, anime les éléments du menu, et lance le jeu ou affiche les sous-menus. Peut inclure une démo animée en arrière-plan.

**Écrans possibles :**
- Menu principal
- Options (son, difficulté)
- High scores
- Crédits

### `HUD.js`
**Heads-Up Display pendant le jeu.** Affiche en permanence le score actuel, le high score, le nombre de vies (icônes Pac-Man), le niveau actuel, les fruits collectés, et éventuellement un mini-indicateur de mode des fantômes. Mise à jour en temps réel, design non-intrusif.

**Éléments affichés :**
- Score (top left)
- High Score (top center)
- Vies (bottom left, icônes)
- Niveau (top right)
- Message temporaire (READY!, etc.)

### `GameOver.js`
**Écran de fin de partie.** Affiche "GAME OVER", le score final, compare au high score, propose de rejouer ou retourner au menu, gère l'enregistrement du nom pour high score, et anime l'apparition des éléments. Peut afficher des statistiques de partie.

**Interactions :**
- Entrer nom pour high score
- Bouton "Rejouer"
- Bouton "Menu principal"
- Affichage statistiques

### `Pause.js`
**Menu de pause.** S'affiche lorsque le jeu est mis en pause, overlay semi-transparent, affiche "PAUSED" ou menu complet (Continuer, Options, Quitter), gèle le jeu, et permet de reprendre facilement. Accessible via Échap ou bouton dédié.

---

## 🎬 Dossier `/js/animation/`

### `Animator.js`
**Système d'animation générique.** Gère les animations frame-by-frame (sprite sheets), les tweens (interpolations), les timelines d'animation, les animations de particules, et fournit une API unifiée pour animer n'importe quel élément du jeu. Support d'easing functions.

**Fonctionnalités :**
- Sprite animation (frames)
- Tween values (lerp, easing)
- Timeline sequences
- Callback on complete

### `SpriteSheet.js`
**Gestion des sprite sheets.** Charge les images de sprites, découpe en frames individuels, définit les animations (séquences de frames), gère le frame rate de chaque animation, et fournit les frames actuels pour le rendu. Optimise le chargement des assets.

**Structure :**
```javascript
{
  image: HTMLImageElement,
  frameWidth: 16,
  frameHeight: 16,
  animations: {
    walk: [0, 1, 2, 1],
    die: [3, 4, 5, 6, 7]
  }
}
```

### `Particle.js`
**Système de particules pour effets visuels.** Crée des effets comme l'explosion de points lors de collecte, les étincelles, la fumée, les trails de mouvement, etc. Gère la durée de vie, la vélocité, la gravité, les couleurs, et le rendu de multiples particules simultanément.

**Types d'effets :**
- Score pop-ups (+200, +400)
- Explosion mort Pac-Man
- Trail fantômes
- Collecte power-up

---

## 🛠️ Dossier `/js/utils/`

### `Vector2D.js`
**Classe utilitaire pour vecteurs 2D.** Représente des positions (x, y), implémente les opérations mathématiques (addition, soustraction, multiplication, division), calcule la longueur et la normalisation, fournit des méthodes de distance et de dot product. Simplifie les calculs de géométrie.

**Méthodes :**
- `add(vector)`, `subtract(vector)`, `multiply(scalar)`
- `length()`, `normalize()`
- `distance(otherVector)`
- `dot(otherVector)`, `angle()`

### `Timer.js`
**Gestionnaire de timers et délais.** Crée des timers avec callback, gère les timeouts et intervals, permet la pause/reprise des timers, supporte le delta time pour indépendance du framerate, et gère plusieurs timers simultanés. Alternative à setTimeout/setInterval pour le jeu.

**Fonctionnalités :**
- `setTimeout(callback, delay)`
- `setInterval(callback, interval)`
- `pause()`, `resume()`
- Support delta time

### `Storage.js`
**Interface pour localStorage.** Sauvegarde et charge les données (high scores, progression, options), sérialise/désérialise les objets JavaScript, gère les erreurs de quota, fournit des valeurs par défaut, et encapsule l'API localStorage pour faciliter son utilisation.

**Méthodes :**
- `save(key, data)` : Sauvegarde données
- `load(key, defaultValue)` : Charge données
- `clear()` : Efface tout
- Gestion automatique JSON

### `helpers.js`
**Fonctions utilitaires diverses.** Contient des fonctions réutilisables : clamp (limiter une valeur), lerp (interpolation linéaire), randomInt, randomFloat, convertisseurs d'unités (pixels ↔ cellules), formatteurs (temps, score), et autres helpers génériques.

**Exemples de fonctions :**
```javascript
clamp(value, min, max)
lerp(start, end, t)
randomInt(min, max)
cellToPixel(cellX, cellY)
pixelToCell(pixelX, pixelY)
formatScore(score)
```

---

## 🎨 Dossier `/assets/`

### `/assets/images/sprites/`

#### `pacman.png`
Sprite sheet contenant toutes les frames d'animation de Pac-Man : ouverture de bouche (3-4 frames par direction), animation de mort (10-12 frames), et positions statiques. Organisé en grille régulière. Format PNG transparent. Dimensions typiques : 16×16px par frame.

#### `ghosts.png`
Sprite sheet de tous les fantômes : 4 couleurs (rouge, rose, cyan, orange), animations de mouvement par direction, état Frightened (bleu), clignotement (bleu/blanc), mode Eyes (yeux seuls). Peut inclure les animations des jambes. 16×16px par frame.

#### `fruits.png`
Sprite sheet des fruits bonus : cerise, fraise, orange, pomme, melon, galaxian, cloche, clé. Peut inclure animations ou variations. 16×16px par sprite. Organisé par ordre d'apparition dans les niveaux.

#### `tiles.png`
Sprite sheet des éléments du labyrinthe : différents types de murs (coins, lignes, jonctions), portes, décorations. Permet de construire visuellement le labyrinthe. Tuiles de 8×8px ou 16×16px.

### `/assets/images/ui/`

#### `logo.png`
Logo du jeu pour le menu principal. Style arcade classique avec texte "PAC-MAN" et éléments iconiques. Format PNG transparent, haute résolution pour différents écrans.

#### `life-icon.png`
Petite icône de Pac-Man utilisée pour afficher le nombre de vies dans le HUD. Généralement 16×16px ou 24×24px. PNG transparent.

#### `menu-bg.png`
Image de fond pour les menus. Peut être un pattern de points, un labyrinthe stylisé, ou une scène animée. Optimisée pour ne pas distraire du texte.

### `/assets/sounds/`

#### `/music/intro.mp3`
Musique d'introduction jouée au démarrage du jeu ou dans le menu. Courte mélodie reconnaissable (quelques secondes). Format MP3 ou OGG pour compatibilité.

#### `/music/gameplay.mp3`
Boucle musicale d'ambiance pendant le jeu. Peut être la sirène iconique qui s'accélère progressivement. Doit pouvoir boucler seamlessly.

#### `/sfx/chomp.wav`
Son court joué à chaque collecte de pac-gomme. Son "waka-waka" caractéristique. Format WAV pour latence minimale, très court (< 0.1s).

#### `/sfx/death.wav`
Son de mort de Pac-Man. Mélodie descendante reconnaissable. Environ 2 secondes. Joué une seule fois lors de la perte d'une vie.

#### `/sfx/eat-ghost.wav`
Son joué quand Pac-Man mange un fantôme en mode Frightened. Son différent du chomp normal. Court et satisfaisant.

#### `/sfx/power-up.wav`
Son joué lors de la collecte d'une super pac-gomme. Lance la musique de mode Frightened. Transition entre musique normale et mode power-up.

#### `/sfx/siren.wav`
Sirène d'ambiance constante pendant le jeu. Boucle qui s'accélère selon le nombre de pac-gommes restantes. Crée la tension.

#### `/sfx/fruit.wav`
Son spécial pour la collecte d'un fruit. Plus mélodieux que le chomp normal. Indique un bonus important.

### `/assets/fonts/`

#### `arcade.ttf`
Police de caractères style arcade/rétro pour tous les textes du jeu (score, menus, messages). Format TrueType. Style pixelisé ou bitmap pour authenticité.

---

## 📚 Dossier `/docs/`

### `README.md`
Documentation principale complète : présentation du projet, features implémentées, roadmap, guide d'installation, instructions d'utilisation, technologies utilisées, architecture, contribution guidelines, et crédits.

### `MECHANICS.md`
Documentation détaillée des mécaniques de jeu : règles précises du Pac-Man original, comportements des fantômes (modes, personnalités, timings), système de scoring, progression de difficulté, easter eggs, et références au Pac-Man Dossier.

### `API.md`
Documentation technique de l'API interne : description des classes principales, leurs méthodes publiques, les événements disponibles, comment étendre le jeu (ajouter un fantôme, un niveau), et exemples de code.

---

## 🧪 Dossier `/tests/` (Optionnel)

### `/tests/unit/`
Tests unitaires pour les fonctions et classes individuelles. Teste la logique isolée : calculs de vecteurs, pathfinding, détection de collisions, gestion du score, etc. Utilise un framework comme Jest ou Mocha.

### `/tests/integration/`
Tests d'intégration vérifiant l'interaction entre plusieurs systèmes : cycle complet de jeu, transitions entre niveaux, sauvegarde/chargement, coordination IA des fantômes, etc.

---

## 📊 Dossier `/data/`

### `highscores.json`
Fichier JSON stockant les meilleurs scores de manière persistante (backup du localStorage). Structure : tableau d'objets avec nom, score, date, niveau atteint. Peut être utilisé pour un leaderboard en ligne.

```json
[
  {
    "name": "AAA",
    "score": 15420,
    "level": 3,
    "date": "2025-10-14"
  }
]
```

---

## 📋 Résumé de l'Architecture

**Organisation par couches :**
1. **Core** : Moteur de jeu et systèmes fondamentaux
2. **Entities** : Personnages et objets du jeu
3. **AI** : Intelligence artificielle
4. **Systems** : Systèmes de gameplay (score, vies, niveaux)
5. **UI** : Interface utilisateur
6. **Utils** : Utilitaires réutilisables

Cette architecture modulaire facilite la maintenance, les tests et l'évolution du projet.s

Développé avec ❤️ et JavaScript
