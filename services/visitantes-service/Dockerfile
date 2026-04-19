# Usamos una versión ligera de Node.js
FROM node:18-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos solo las dependencias necesarias
RUN npm install

# Copiamos el resto del código del microservicio
COPY . .

# El puerto donde corre nuestra app
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "index.js"]
