# Receptenweb API (Node.js + Express)

Dit project is gemaakt voor het vak Backend Web (EHB). Het is een database-driven REST API gebouwd met Node.js 20+, Express en better-sqlite3 (SQLite).

## Features (opdracht requirements)

- **Database-driven API** (SQLite via better-sqlite3)
- **Twee CRUD interfaces**
  - News (nieuwsberichten)
  - Posts (berichten)
- **Basisvalidatie**
  - Verplichte velden mogen niet leeg zijn
  - Numerieke velden moeten getallen zijn
  - Titel moet minimaal 5 karakters zijn
  - Content moet minimaal 10 karakters zijn
- **Geavanceerde validatie** (extra feature)
  - Limit moet tussen 1 en 100 zijn
  - Offset moet 0 of hoger zijn
  - Zoekterm moet minimaal 2 karakters zijn
- **Paginatie** (limit + offset)
  - `GET /api/news?limit=10&offset=0`
  - `GET /api/posts?limit=10&offset=0`
- **Zoekfunctie**
  - `GET /api/news/search?q=recept` (zoekt in title en content)
  - `GET /api/posts/search?q=test` (zoekt in content)
- **HTML documentatie pagina op root**
  - `GET /` (served from public/index.html)

## Endpoints

### Documentatie (root)
- `GET /`

### API Info
- `GET /api`

### News (CRUD)
| Methode | Endpoint | Beschrijving |
|---------|----------|--------------|
| GET | /api/news | Alle news items ophalen |
| GET | /api/news/:id | Één news item ophalen |
| GET | /api/news/search?q=... | Zoeken in news |
| POST | /api/news | Nieuw news item aanmaken |
| PUT | /api/news/:id | News item updaten |
| DELETE | /api/news/:id | News item verwijderen |

Voorbeeld body (nieuw news item):
```json
{
  "title": "Nieuwe Recepten",
  "content": "We hebben vandaag 5 nieuwe recepten toegevoegd."
}
```

### Posts (CRUD)
| Methode | Endpoint | Beschrijving |
|---------|----------|--------------|
| GET | /api/posts | Alle posts ophalen |
| GET | /api/posts/:id | Één post ophalen |
| GET | /api/posts/search?q=... | Zoeken in posts |
| POST | /api/posts | Nieuwe post aanmaken |
| PUT | /api/posts/:id | Post updaten |
| DELETE | /api/posts/:id | Post verwijderen |

Voorbeeld body (nieuwe post):
```json
{
  "content": "Dit is een nieuwe post met voldoende tekst."
}
```

## Installatie

### Vereisten
- Node.js 20+
- npm
- git

### Stap 1: Clone de repository
```bash
git clone https://github.com/BilalB01/Node.js-API-Project.git
cd Node.js-API-Project
```

### Stap 2: Installeer dependencies
```bash
npm install
```

### Stap 3: Maak .env bestand
Kopieer het voorbeeld bestand:

**Windows (PowerShell):**
```powershell
copy .env.example .env
```

**macOS / Linux:**
```bash
cp .env.example .env
```

### Stap 4: Pas .env aan
Open het `.env` bestand en zet het juiste database pad:
```
PORT=3000
NODE_ENV=development
DB_PATH=./database.sqlite
CORS_ORIGIN=*
```

**Let op:** Als je de Laravel database wilt gebruiken, pas `DB_PATH` aan naar het juiste pad.

### Stap 5: Start de server
```bash
npm run dev
```

### Stap 6: Open in browser
- http://localhost:3000/ (documentatie)
- http://localhost:3000/api/news (news items)
- http://localhost:3000/api/posts (posts)

## Omgevingsvariabelen

| Variabele | Beschrijving | Voorbeeld |
|-----------|--------------|-----------|
| PORT | Poort waarop de server draait | 3000 |
| NODE_ENV | Development of production | development |
| DB_PATH | Pad naar SQLite database | ./database.sqlite |
| CORS_ORIGIN | Toegestane origins | * |

## Git

- `node_modules` staat in `.gitignore`
- Commits zijn gemaakt in logische stappen met duidelijke berichten

## Bronvermeldingen

| Bron | URL |
|------|-----|
| Express.js documentatie | https://expressjs.com/ |
| express-validator documentatie | https://express-validator.github.io/ |
| dotenv documentatie | https://www.npmjs.com/package/dotenv |
| CORS npm package | https://www.npmjs.com/package/cors |
| nodemon documentatie | https://nodemon.io/ |
| MDN Web Docs (JavaScript) | https://developer.mozilla.org/en-US/docs/Web/JavaScript |
| Node.js documentatie | https://nodejs.org/docs/latest/api/ |
