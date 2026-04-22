FROM node:22-bookworm-slim AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=file:/data/dev.db
ENV NEXTAUTH_SECRET=docker-build-secret
ENV NEXTAUTH_URL=http://localhost:3000
ENV OLLAMA_URL=http://127.0.0.1:11434
ENV OLLAMA_MODEL=llama3.1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM node:22-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV DATABASE_URL=file:/data/dev.db

COPY --from=builder /app/public ./public
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN mkdir -p /data

EXPOSE 3000

CMD ["sh", "-c", "node scripts/init-db.mjs && node server.js"]
