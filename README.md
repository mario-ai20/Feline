# Feline AI

Feline is a Next.js web app with local accounts, separate chats, per-account settings, backgrounds, sounds and NSFW+ separation.
Discord name: `Felinefoil`

## What Feline needs

For local use on your own PC:

- [Git](https://git-scm.com/) to clone the repository
- [Git LFS](https://git-lfs.com/) so the media files download correctly
- [Node.js 20 or newer](https://nodejs.org/)
- [Ollama](https://ollama.com/) running locally on `http://127.0.0.1:11434`
- A modern browser
- Camera access if you want to use NSFW+ age verification
- Microphone access if you want to use intro or sound features in the browser

Feline is local-first by default.
- `127.0.0.1` only works on your own machine.
- Every person who runs Feline locally needs their own Ollama, Node.js and browser setup.
- This repo does not require Docker.

## Quick start

```bash
git lfs install
npm install
copy .env.example .env
```

If you clone this repo on a new machine, run `git lfs install` once before pulling so the MP3 and MP4 files download properly.

Fill in `.env` with at least:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
OLLAMA_URL="http://127.0.0.1:11434"
OLLAMA_MODEL="llama3.1"
```

Initialize the database:

```bash
npm run db:init
npm run prisma:generate
```

Start the app:

```bash
npm run dev
```

Or double click `start-feline.bat` in the project folder. It starts the server and opens the browser automatically.

Then open:

```text
http://localhost:3000
```

## What users can do

- Create a local account with name, last name, birth date, username and password
- Keep chats and settings per account
- Use separate normal and NSFW+ chat spaces
- Choose backgrounds, login backgrounds, intro sounds and background sounds per account
- Use folder-based media categories in `public/backgrounds/`
- Save memory and adult-memory settings per account

## Media folders

Put your own files in these folders:

- `public/backgrounds/` for normal backgrounds
- `public/backgrounds/nsfw/` for NSFW-only backgrounds
- `public/inlog-background/` for login backgrounds
- `public/intro-music/` for intro sounds
- `public/background-music/` for background sounds
- `public/intro-assets/` for the fixed Feline logo and intro art

The larger MP3 and MP4 files are stored with Git LFS so the repository stays easier to share and clone.

Background folders are grouped by folder name. For example, everything inside `public/backgrounds/Intens/` appears together as the `Intens` category.

Login backgrounds can be images or videos:

- `.mp4`
- `.webm`
- `.ogg`
- `.jpg`
- `.jpeg`
- `.png`
- `.webp`

## Settings behavior

- Settings are saved per account.
- Press `Opslaan` to keep changes.
- Backgrounds and sounds stay tied to your account until you change them again.
- New media files are picked up when you reopen settings or refresh the media list.
- The app logo/tab icon is fixed to Feline.
- There is no separate profile-icon picker in settings anymore.

## Useful scripts

```bash
npm run lint
npm run build
npm run prisma:generate
npm run prisma:studio
npm run db:init
```

## Notes

- Chats are separated into normal and NSFW+ spaces.
- NSFW+ needs age verification.
- The app uses Ollama for local AI responses.
- Database and settings are stored with Prisma and SQLite by default.
- No Docker setup is required for normal use.
