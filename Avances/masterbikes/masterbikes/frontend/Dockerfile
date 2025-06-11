FROM node:16 AS builder
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build && ls -la /app/dist  # Verifica la construcción

FROM nginx:alpine
# Elimina TODO el contenido previo
RUN rm -rf /usr/share/nginx/html/*
# Copia SOLO los archivos construidos por Vite
COPY --from=builder /app/dist /usr/share/nginx/html
# Configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Permisos
RUN chmod -R 755 /usr/share/nginx/html