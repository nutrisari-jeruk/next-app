# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set memory limit untuk build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Buat direktori kerja
WORKDIR /app

# Salin dan install dependensi
COPY package*.json ./
RUN npm ci

# Salin seluruh project dan build
COPY . .
RUN npm run build

# Stage 2: Runtime stage
FROM node:18-alpine AS runner

# Environment production
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Buat user non-root
RUN addgroup -g 1001 nextjs && adduser -D -u 1001 -G nextjs nextjs

# Buat direktori aplikasi
WORKDIR /app
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static

# Ubah user
USER nextjs

# Expose port dan jalankan
EXPOSE 3000
CMD ["node", "server.js"]
