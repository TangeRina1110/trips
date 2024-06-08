#FROM ubuntu:latest
#LABEL authors="Екатерина"
#
#ENTRYPOINT ["top", "-b"]
# Используем официальный Node.js образ как базовый
FROM node:14

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы в контейнер
COPY . .

# Собираем React приложение
RUN npm run build

# Устанавливаем базовый образ для сервера Nginx
FROM nginx:alpine

# Копируем файлы сборки React приложения в папку для статических файлов Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Экспонируем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]