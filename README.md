# reactChat
react Chat with GPT


1. start front react
cd react-frontend
yarn start
then go to http://localhost:3000/ via brwoser

2. start node server
cd server
node index.js

3. start python server
cd server 
py main.py


# dockernize react frontend
cd react-frontend
docker build -t react-frontend:latest .
it will create frontend docker img

# dockernize react frontend
cd server
docker build -t node-backend:latest .
it will create backend node server docker img

docker build -f Dockerfile.py -t py-backend:latest .
it will create backend python server img