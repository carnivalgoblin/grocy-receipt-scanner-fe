# --- STAGE 1: Bauen (Node.js 24) ---
FROM node:24 AS build
WORKDIR /app

# Dependencies installieren
COPY package*.json ./
RUN npm install

# Quellcode kopieren und bauen
COPY . .
RUN npm run build -- --configuration production

# --- STAGE 2: Ausliefern (Nginx) ---
FROM nginx:alpine

# 1. Den gebauten Angular-Code in den Webserver kopieren
# WICHTIG: Prüfe, ob dein Projekt wirklich 'grocy-receipt-scanner-fe' heißt!
# Schau in deine angular.json unter "outputPath" oder "dist/..."
COPY --from=build /app/dist/grocy-receipt-scanner-fe/browser /usr/share/nginx/html
# Falls der Build fehlschlägt, versuche diese Zeile stattdessen (ältere Angular Versionen):
# COPY --from=build /app/dist/grocy-receipt-scanner-fe /usr/share/nginx/html

# 2. Unsere Nginx-Konfiguration kopieren (für den Reverse Proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
