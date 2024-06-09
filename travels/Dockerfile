# Используем официальный Node.js образ как базовый
FROM node:latest

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /frontend

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости, включая serve
RUN npm install && npm install -g serve

# Копируем все файлы в контейнер
COPY . .
# Устанавливаем переменные окружения для frontend
# Собираем React приложение
# Собираем React
#RUN npm run build

# Экспонируем порт для frontend
EXPOSE 3000

# Запускаем сервер с помощью serve
CMD ["npm", "run", "dev"]
#CMD ["serve", "-s", "build"]
