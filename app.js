import express from "express";
import morgan from "morgan";
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js'; 
import { sequelize } from "./db/database.js" //추가

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use('/tweets', tweetsRouter);  
app.use('/auth', authRouter); 

app.use((req, res, next) => {
    res.sendStatus(404);
});

//DB 연결 테스트
//1. 
//db.getConnection().then(connection => console.log(connection)); //추가

//2.
sequelize.sync().then(()=>{
    app.listen(config.host.port);
})




