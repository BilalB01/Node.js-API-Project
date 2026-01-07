# Receptenweb Node.js API

Een RESTful API gebouwd met Node.js en Express voor het Receptenweb project.

## 🚀 Installatie

### Vereisten
- Node.js (versie 20 of hoger)
- NPM
- SQLite database (van het Laravel project)

### Stappen

1. **Clone de repository**
```bash
git clone <jouw-repository-url>
cd Node.js-API-Project
```

2. **Installeer dependencies**
```bash
npm install
```

3. **Configureer environment variabelen**
```bash
# Kopieer .env.example naar .env
cp .env.example .env

# Pas de database path aan in .env naar jouw Laravel database locatie
```

4. **Start de development server**
```bash
npm run dev
```

De API draait nu op `http://localhost:3000`

## 📚 API Documentatie

Bezoek `http://localhost:3000` voor de volledige API documentatie.

## 🛠️ Beschikbare Scripts

- `npm start` - Start de productie server
- `npm run dev` - Start de development server met nodemon (auto-reload)

## 📁 Project Structuur

```
Node.js-API-Project/
├── src/
│   ├── config/          # Database configuratie
│   ├── controllers/     # Business logic
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── utils/           # Helper functies
├── public/              # Statische bestanden (API docs)
├── .env                 # Environment variabelen (niet in git)
├── .env.example         # Environment variabelen template
├── server.js            # Entry point
└── package.json         # Dependencies
```

## 🔧 Technologieën

- **Node.js** - Runtime environment
- **Express** - Web framework
- **better-sqlite3** - SQLite database driver
- **express-validator** - Validatie middleware
- **dotenv** - Environment variabelen
- **cors** - Cross-Origin Resource Sharing

## 📝 Bronvermeldingen

- Express documentatie: https://expressjs.com/
- better-sqlite3 documentatie: https://github.com/WiseLibs/better-sqlite3
- express-validator documentatie: https://express-validator.github.io/

## 👤 Auteur

Bilal

## 📄 Licentie

ISC
