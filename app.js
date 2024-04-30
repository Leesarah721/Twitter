import express from "express";
import morgan from "morgan";
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use('/tweets', tweetsRouter);  //tweetsRouter 미들웨어 등록
app.use('/auth', authRouter); //authRouter 미들웨어 등록

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.listen(8080);