# Usa imagem base do Node.js
FROM node:18

# Define diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependências primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para rodar o app
CMD ["node", "server.js"]
