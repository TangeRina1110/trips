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

# Указываем порт, который будет слушать приложение
EXPOSE 4000

# Запускаем приложение
CMD ["npm", "start"]