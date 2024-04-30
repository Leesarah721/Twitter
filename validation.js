import express from 'express';
import { body, param, validationResult } from "express-validator";

const app = express();
app.use(express.json());

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        return next();
    }
    console.log(errors.array());
    return res.status(400).json({message: errors.array()[0].msg});
}

app.get('/:email', [param('email').isEmail().withMessage('이메일을 입력하세요!'), validate], (req, res, next) => {
    res.send(':연애편지:');
});


//[]: validation 기능을 안에다 쓸 수 있다
// 메서드 체이닝으로 벨리데이션 쓰기
// trim: 공백 없애기
// isLength: 최대최소 설정
// post: 자료를 bbody로 받음
// get: param로 받음

app.post('/users', [
    body('name').trim().isLength({min:2}).withMessage('이름은 두글자 이상으로 입력!'),
    body('age').isInt().withMessage('나이는 숫자로 입력!'),
    body('height').isInt({min:100, max:200}).withMessage('키는 100이상 200이하로 입력하세요!'),
    body('job').notEmpty(),
    validate
], (req, res, next) => {
    console.log(req.body);
    res.sendStatus(201);
})

app.listen(8080);
