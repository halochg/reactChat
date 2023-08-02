import express from 'express';
import Server from 'socket.io';
import axios from 'axios';
import http from 'http';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

server.listen(8080, ()=>{
    console.log("hi server 8080");
})