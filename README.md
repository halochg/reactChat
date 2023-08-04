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

    openai.api_key=""

    cd server; 

    py main.py


this is a screenshot on browser
![image](https://github.com/halochg/reactChat/assets/2626025/aee59d69-647e-44eb-baa3-324cff90e060)


# dockernize react frontend
cd react-frontend

docker build -t react-frontend:latest .

it will create frontend docker img

# dockernize nodejs and python backend
cd server

docker build -t node-backend:latest .

it will create backend node server docker img

docker build -f Dockerfile.py -t py-backend:latest .

it will create backend python server img
