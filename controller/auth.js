import * as authRepository from '../data/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js'; 

//삭제
//const secretKey = "abcd1234%^&*" ;
//const jwtExpiresInDays = '2d'; 
//const bcryptSaltRounds = 10; 

/*
문제
jwt.js를 참고하여 controller/auth.js 에 토큰을 발행하고 login()에 로그인 완료되면 클라이언트에 토큰을 출력하는 프로세스를 만들어보자
*/

// jwt 토근생성 
function createJwtToken(id){
    return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiresInSec});
}

/*
문제.
회원가입시 아이디 중복체크 하기
단. 중복이라면 409을 리턴
*/

// 회원가입 함수 
export async function signup(req, res, next){
    const {username, password, name, email, url} = req.body;
    const found = await authRepository.findByUsername(username);
    if(found){
        return res.status(409).json({message:`${username}이 이미 있습니다`});
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await authRepository.createUser({username, hashed, name, email, url});
    const token = createJwtToken(userId);
    res.status(201).json({token, username});
}

/*
문제
controller/auth.js 에서 login()를 bcrypt를 적용하여 로그인 프로세스를 만들어보자
*/
 
// 로그인하는 함수 
export async function login(req, res, next){
    const {username, password} = req.body;
    // const user = await authRepository.login(username);
    const user = await authRepository.findByUsername(username);
    console.log(user);
    if(!user){
        return res.status(401).json({message: `아이디를 찾을 수 없음`});
    }
    const isValidpassword = await bcrypt.compareSync(password, user.password);
    if(!isValidpassword){
        return res.status(401).json({message: `비밀번호가 틀렸음`});
    }
    const token = createJwtToken(user.id);
    res.status(200).json({token, username});
}

// export async function verify(req, res, next){
//     const token = req.header['Token'];
//     if(token){
//         res.status(200).json(token);
//     }
// }

//me 
export async function me(req, res, next){
    const user = await authRepository.findById(req.userId);
    console.log(user);
    if(!user){
        return res.status(404).json({message: `일치하는 사용자가 없음`});
    }
    res.status(200).json({token: req.token, username: user.username});
}