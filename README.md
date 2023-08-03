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
 update openai.api_key in main.py with your new key, the key will be disabled after checked in to Github
openai.api_key="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"

cd server 
py main.py


this is a screenshot on browser
![image](https://github.com/halochg/reactChat/assets/2626025/91292a2f-2786-4d33-b718-37ca4cb248b9)


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
