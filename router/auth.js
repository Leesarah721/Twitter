import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';  //추가

const router = express.Router();

 //추가
const validateLogin = [
    body('username').trim().notEmpty().withMessage('username을 입력하세요'),
    body('password').trim().isLength({ min: 4 }).withMessage('password는 최소 4자 이상 입력하세요'), validate

];

 //수정
const validateSignup = [
    ...validateLogin,
    body('name').trim().notEmpty().withMessage('name을 입력하세요'),
    body('email').isEmail().withMessage('이메일 형식을 확인하세요'),
    body('url').isURL().withMessage('URL 형식을 입력하세요'),
    validate
];


router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateSignup, authController.login);  //수정

router.get('/me', isAuth, authController.me); 

export default router;