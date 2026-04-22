# Saartje AI

Saartje is een Next.js webapp met lokale login, chatgeschiedenis, instellingen en media-ondersteuning.

## Vereisten

- Node.js 20+ voor lokale ontwikkeling
- Docker voor een online deployment
- Een online host met Docker en een persistent volume

## Installatie

```bash
npm install
copy .env.example .env
```

Vul daarna `.env` in met ten minste:

```env
NEXTAUTH_SECRET=een-lange-willekeurige-sleutel
NEXTAUTH_URL=http://localhost:3000
OLLAMA_URL=http://127.0.0.1:11434
OLLAMA_MODEL=llama3.1
```

Initialiseer de database:

```bash
npm run db:init
npm run prisma:generate
```

Start de webversie:

```bash
npm run dev
```

Open daarna:

```text
http://localhost:3000
```

## Online zetten met Docker

De makkelijkste gratis route is een Docker-host met een persistent volume.

1. Zet de code op GitHub.
2. Laat de host de repo of een Docker image gebruiken.
3. Geef deze environment variables mee:

```env
DATABASE_URL=file:/data/dev.db
NEXTAUTH_SECRET=een-lange-willekeurige-sleutel
NEXTAUTH_URL=https://jouw-domein.example
OLLAMA_URL=https://jouw-online-ollama.example
OLLAMA_MODEL=llama3.1
```

4. Mount een persistent volume op `/data`.
5. Start de container.

Lokaal testen met Docker:

```bash
docker compose up --build
```

Daarna openen:

```text
http://localhost:3000
```

Belangrijk:

- De app draait dan online, maar je AI-backend moet ook online bereikbaar zijn via `OLLAMA_URL`.
- Gebruik voor een publieke site dus geen lokale `127.0.0.1`-waarde meer.

## Media-mappen

Plaats eigen bestanden in:

- `public/backgrounds/`
- `public/intro-music/`
- `public/background-music/`
