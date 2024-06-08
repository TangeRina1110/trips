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
# Собираем React
RUN npm run build
EXPOSE 3000
# Запускаем приложение
CMD ["serve", "-s", "build", "-l", "3000"]
