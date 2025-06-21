## Memory Game 

> ###  Description

Ce projet est un jeu de mémoire (Memory / Concentration) développé dans le cadre du test technique Clic Campus. Il respecte les contraintes et les fonctionnalités attendues :

- **Modes :** solo
- **Sélection du thème :** nombres ou icônes
- **Grille :** 4×4
- **Responsive design, accessibilité (WCAG 2.1 AA)**
- **Compteur de coups, score, détection de fin de partie**
- **Sauvegarde des scores en BDD + endpoints statistiques**
- **Dark/light mode, animation des cartes avec TailwindCSS, i18n FR/EN**

---

> ###  Architecture du projet

#### Frontend (`app/frontend/`)

- **React + TypeScript + Vite** : base solide, rapide au build et au développement.
- **Organisation :**
  ```
  src/
  ├── app/pages : pages principales (home, game, leaderboard, results, stats)
  ├── app/providers : providers globaux (theme, translation)
  ├── app/routes : gestion des routes
  ├── common : hooks, services API, store Zustand, types partagés
  ├── components : UI et composants métier
  ├── config : fichiers de config (i18n)
  ├── features : logique métier (leaderboard, settings)
  ├── lib : utilitaires
  ```
- **Routing :** React Router
- **State management :** Zustand (simple, léger, pas de boilerplate comparé à Redux)
- **i18n :** `react-i18next`

#### Backend (`app/backend/`)

- **FastAPI + Python 3.12**
- **PostgreSQL (via Docker)**
- **Endpoints :**
  - `GET /scores/top10` : Top 10 des meilleurs scores
  - `GET /scores/stats` : Moyenne des scores + nombre de participations
  - `POST /scores/` : Enregistrement d'un score

#### Docker (root)

- `docker-compose.yml` orchestre :
  - **PostgreSQL**
  - **Backend FastAPI**
  - **Frontend React**

---

> ###  Installation & Lancement

1️⃣ **Prérequis :**

- Docker + Docker Compose

2️⃣ **Lancement :**

```bash
Make all
```


👉 L’app sera disponible :

- Frontend : [http://localhost:4000](http://localhost:4000)
- Backend : [http://localhost:4001](http://localhost:4001)
- DB : PostgreSQL exposé sur port 4002

3️⃣ **Base de données :**

- Auto-configurée au démarrage (PostgreSQL + volume persistant)

---

2️⃣ **Variables d'environnement  :**

- Backend :
```bash
DB_USERNAME=root
DB_PASSWORD=mdp
DB_NAME=GAMEMEMORY_TT_DB
DB_HOST=GAMEMEMORY_DB
FRONT_URL=http://localhost:4000
```

- Frontend :
```bash
    VITE_BACKEND_URL=http://localhost:4001
```

### 📚 Choix des librairies et comparaisons

| Fonctionnalité     | Choix                                    | Alternatives                | Justification                                                           |   |   |   |
| ------------------ | ---------------------------------------- | --------------------------- | ----------------------------------------------------------------------- | - | - | - |
|   |   |   |
| Styling            | TailwindCSS                              | Styled-components           | Rapide à écrire, classes utilitaires, très léger pour le DOM            |   |   |   |
| Animation          | TailwindCSS (avec `tailwindcss-animate`) | Framer Motion, React Spring | Suffisant pour les animations de base, plus léger que Framer Motion     |   |   |   |
| State management   | Zustand                                  | Redux, Jotai                | Moins de boilerplate que Redux, API plus simple, léger et performant    |   |   |   |
| Routing            | React Router                             | Next.js router              | Adapté Vite + React, SSR non nécessaire ici                             |   |   |   |
| Form / validation  | React Hook Form + zod                    | Formik, Yup                 | RHF plus léger et performant que Formik, zod très bien intégré avec RHF |   |   |   |
| i18n               | react-i18next                            | LinguiJS                    | Large adoption, intégration facile avec React                           |   |   |   |
| Backend framework  | FastAPI                                  | Flask, Django               | Typage fort, performances, docs auto avec OpenAPI                       |   |   |   |
| DB                 | PostgreSQL                               | SQLite, MySQL               | Puissant, adapté pour prod et dev, support des types complexes          |   |   |   |

---

### 🔗 Endpoints API principaux

- `GET /scores/top` → Récupération des 10 meilleurs scores
- `GET /scores/stats` → Moyenne des scores + nombre de participations
- `POST /scores/` → Ajout d’un score

---

### ✅ Fonctionnalités implémentées

- Mode solo
- Grille 4x4 (16 cartes)
- Sélection thème (nombres / icônes)
- Responsive design + accessibilité (clavier, focus visibles)
- Compteur coups, fin de partie, redémarrage
- Sauvegarde + API scores
- Dark / light mode
- Animation fluide des cartes ( css 3D flipped animation)
- i18n FR/EN
- CI possible (lint / format avec npm scripts, prêt pour GitHub Actions)

---

### 💡 Décisions d’architecture

- **Découpage clair :** `features`, `common`, `components`, `app`
- **State management léger (Zustand) :** suffisant pour un jeu sans complexité extrême
- **React + Vite :** pour un dev rapide, sans surcharge inutile (Next.js surdimensionné ici)
- **FastAPI :** typage, rapidité de dev, génération auto de la doc API
- **Docker :** stack complète isolée, facile à déployer et tester

---

### 📝 Commandes utiles

```bash
# Frontend
yarn lint      # Linter avec ESLint
yarn format    # Formatter avec Prettier
npm run build     # Build production

```

---

###

