import * as authRepository from "../data/auth.js";
import bcrypt from 'bcrypt'; 
import jsonWebTokenError from  "jsonwebtoken" ; //추가

const secret = "abcd1234%^&*" //추가

//jwt 토근 //추가
async function makeToken(id){
    const token = jwt.sign({
        id: id,
        isAdmin: false
    }, secret, {expireIn:'1h'})
    return token; 
} 

// 회원가입 함수 //수정
export async function signup(req, res, next){
    const { username, password, name, email } = req.body;
    const hashed = bcrypt.hashSync(password, 10); //추가
    const users = await authRepository.createUser(username, hashed, password, name, email); //hashed 추가
    if(users){
        res.status(201).json(users);
    }
}
 
// 로그인하는 함수 //수정
export async function login(req, res, next){
    const { username, password } = req.body;
    const user = await authRepository.login(username);
    // const bcryptPW = bcrypt.hashSync(password, 10);
    // const result = bcrypt.compareSync('abcd1234', bcryptPW);
    if(user){
        if(bcrypt.compareSync(password, user.password)){
            //res.status(201).json(`${username} 로그인 완료`); //지우기
            res.status(201).header('Token', makeToken(username)).json(`${username} 로그인 완료`); //토큰값만들기 //추가
        }
        else{
            res.status(404).json({message: `${username}님 아이디 또는 비밀번호 확인하세요`})
        }
    }else{
         res.status(404).json({ message: `${username} 님 아이디 또는 비밀번호를 확인해주세요` });
    }
}

//토큰 확인 //추가
export async function verify(req, res, next){
    const token = req.header['Token'];
    if(token){
        res.status(200).json(token);
    }
}



