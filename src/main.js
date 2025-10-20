
import {TILE_EMPTY, TILE_PELLET, TILE_POWER, TILE_SIZE, TILE_WALL, TILE_TELE, MazeData} from './config'

// Ajuste hauteur du canvas selon mapData si nécessaire
const rows = MazeData.length;
const cols = MazeData[0].length;

// -------------------- Setup canvas --------------------
const canvas = document.getElementById('game');
canvas.width = cols * TILE_SIZE;
canvas.height = rows * TILE_SIZE;
const ctx = canvas.getContext('2d');

// -------------------- Entités : Pac-Man --------------------
const player = {
  x: 1.5 * TILE_SIZE,  // position en pixels (centre approximatif)
  y: 1.5 * TILE_SIZE,
  speed: 2.0,         // px par frame
  dirX: 0,
  dirY: 0,
};

// -------------------- Fonctions utilitaires --------------------
function tileAt(col, row) {
  if (row < 0 || row >= rows || col < 0 || col >= cols) return TILE_WALL;
  return MazeData[row][col];
}

function setTile(col, row, val) {
  if (row < 0 || row >= rows || col < 0 || col >= cols) return;
  MazeData[row][col] = val;
}

function worldToTile(pos) {
  return Math.floor(pos / TILE_SIZE);
}

// Vérifie collision mur à la position future (précise) : on teste les 4 coins de la hitbox circulaire/square
function collidesWithWall(xPx, yPx) {
  // Utiliser une petite marge (radius) pour le personnage
  const radius = TILE_SIZE * 0.45;
  const left   = xPx - radius;
  const right  = xPx + radius;
  const top    = yPx - radius;
  const bottom = yPx + radius;

  const colsToCheck = [
    worldToTile(left), worldToTile(right)
  ];
  const rowsToCheck = [
    worldToTile(top), worldToTile(bottom)
  ];

  for (let c of colsToCheck) {
    for (let r of rowsToCheck) {
      if (tileAt(c, r) === TILE_WALL) return true;
    }
  }
  return false;
}

// -------------------- Logique : déplacement et collecte --------------------
function updatePlayer() {
  // Calcul de la prochaine position candidate
  const nextX = player.x + player.dirX * player.speed;
  const nextY = player.y + player.dirY * player.speed;

  // Téléporteur : si la case en dessous est TELE, téléporter vers l'autre TELE (simple implémentation)
  const tCol = worldToTile(nextX);
  const tRow = worldToTile(nextY);
  if (tileAt(tCol, tRow) === TILE_TELE) {
    // Cherche autre TELE
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if ((c !== tCol || r !== tRow) && tileAt(c, r) === TILE_TELE) {
          player.x = (c + 0.5) * TILE_SIZE;
          player.y = (r + 0.5) * TILE_SIZE;
          return;
        }
      }
    }
  }

  // Test collisions X puis Y indépendamment (meilleure maniabilité)
  if (!collidesWithWall(nextX, player.y)) {
    player.x = nextX;
  } else {
    // s'arrête sur X
  }
  if (!collidesWithWall(player.x, nextY)) {
    player.y = nextY;
  } else {
    // s'arrête sur Y
  }

  // Collecte des pastilles si sur une case contenant pellet
  const col = worldToTile(player.x);
  const row = worldToTile(player.y);
  const tile = tileAt(col, row);
  if (tile === TILE_PELLET) {
    setTile(col, row, TILE_EMPTY);
    // incrémenter score etc
  } else if (tile === TILE_POWER) {
    setTile(col, row, TILE_EMPTY);
    // activer mode "power" etc
  }
}

// -------------------- Rendu --------------------
function drawMap() {
  // fond
  ctx.clearRect(0,0,canvas.width, canvas.height);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tile = MazeData[r][c];
      const x = c * TILE_SIZE;
      const y = r * TILE_SIZE;

      // Dessin des murs
      if (tile === TILE_WALL) {
        // mur plein (on peut ajouter contours arrondis / arcs pour ressembler à Pac-Man)
        ctx.fillStyle = '#152B4A';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
        // contour pour lisibilité
        ctx.strokeStyle = '#0f1c2f';
        ctx.lineWidth = 2;
        ctx.strokeRect(x+1, y+1, TILE_SIZE-2, TILE_SIZE-2);
      } else {
        // sol
        ctx.fillStyle = '#000';
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

        // pastille normale
        if (tile === TILE_PELLET) {
          ctx.beginPath();
          ctx.arc(x + TILE_SIZE/2, y + TILE_SIZE/2, TILE_SIZE * 0.12, 0, Math.PI*2);
          ctx.fillStyle = '#FFD700';
          ctx.fill();
        } else if (tile === TILE_POWER) {
          ctx.beginPath();
          ctx.arc(x + TILE_SIZE/2, y + TILE_SIZE/2, TILE_SIZE * 0.28, 0, Math.PI*2);
          ctx.fillStyle = '#FFB6C1';
          ctx.fill();
        } else if (tile === TILE_TELE) {
          // téléporteur visuel
          ctx.strokeStyle = '#7FFFD4';
          ctx.lineWidth = 3;
          ctx.strokeRect(x+4, y+4, TILE_SIZE-8, TILE_SIZE-8);
        }
      }
    }
  }
}

function drawPlayer() {
  // Simple Pac-Man jaune (pas d'animation de bouche ici)
  ctx.beginPath();
  ctx.arc(player.x, player.y, TILE_SIZE*0.45, 0, Math.PI*2);
  ctx.fillStyle = '#FFEE00';
  ctx.fill();

  // oeil
  ctx.beginPath();
  ctx.arc(player.x + TILE_SIZE*0.12, player.y - TILE_SIZE*0.2, TILE_SIZE*0.08, 0, Math.PI*2);
  ctx.fillStyle = '#000';
  ctx.fill();
}

// -------------------- Input clavier --------------------
window.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowUp':    player.dirX = 0; player.dirY = -1; break;
    case 'ArrowDown':  player.dirX = 0; player.dirY = 1; break;
    case 'ArrowLeft':  player.dirX = -1; player.dirY = 0; break;
    case 'ArrowRight': player.dirX = 1; player.dirY = 0; break;
  }
});

// -------------------- Boucle principale --------------------
function loop() {
  updatePlayer();
  drawMap();
  drawPlayer();
  requestAnimationFrame(loop);
}

// Initialise : remplis les cases vides par des pastilles si tu veux par défaut
function initPelletsIfEmpty() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (MazeData[r][c] === TILE_EMPTY) {
        MazeData[r][c] = TILE_PELLET;
      }
    }
  }
  // conserve murs et téléporteurs etc.
}

// Pour la démo, on souhaite que les 0 deviennent des pastilles
initPelletsIfEmpty();
player.x = 1.5 * TILE_SIZE;
player.y = 1.5 * TILE_SIZE;

requestAnimationFrame(loop);