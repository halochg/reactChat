import express from 'express';
import {Server} from 'socket.io';
import axios from 'axios';
import http from 'http';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        method: ['GET','POST'],
    },
});
io.on('connection', (socket)=>{
    socket.on('stream', (message)=>{
        try{
           const stream = axios.get('http://127.0.0.1:5000/message',{
            responseType: 'stream',
            headers: {
                message: `${message}`,
            }
           });
           stream.then((response)=>{
            response.data.on('data', (chunk)=>{
                const text = chunk.toString('utf8');
                const messages = JSON.stringify(text.split('\n\n'));
                const message = JSON.parse(messages);
                console.log(message)
                socket.emit('stream', message);
            })
           })
        }catch {
            const error = {
                message: 'Error.',
            };
            socket.emit('stream', error);
        }
    });

});

server.listen(8080, ()=>{
    console.log("hi server 8080");
})