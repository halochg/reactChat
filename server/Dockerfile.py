FROM node:16
WORKDIR /app
COPY package.json ./
COPY . .
CMD ["py","main.py"]