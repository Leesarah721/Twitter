import * as authRepository from '../data/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = "abcd1234%^&*" ;
const jwtExpiresInDays = '2d'; 
const bcryptSaltRounds = 10; 


// //jwt 토근 //추가
// async function makeToken(id){
//     const token = jwt.sign({
//         id: id,
//         isAdmin: false
//     }, secret, {expireIn:'1h'})
//     return token; 
// } 


//jwt 토근생성 위에 거 다시 작성
function createJwtToken(id){
    return jwt.sign({id}, secretKey, {expiresIn: jwtExpiresInDays});
}

// 회원가입 함수 //수정
export async function signup(req, res, next){
    const {username, password, name, email, url} = req.body;
    const found = await authRepository.findByUsername(username);
    if(found){
        return res.status(409).json({message:`${username}이 이미 있습니다`});
    }
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    const userId = await authRepository.createUser({username, hashed, name, email, url});
    const token = createJwtToken(userId);
    res.status(201).json({token, username});
}
 
// 로그인하는 함수 
export async function login(req, res, next){
    const {username, password} = req.body;
    // const user = await authRepository.login(username);
    const user = await authRepository.findByUsername(username);
    if(!user){
        return res.status(401).json({message : '아이디를 찾을 수 없음'})
    }
    const isValidpassword = await bcrypt.compareSync(password, user.password);
    if(!isValidpassword){
        return res.status(401).json({message : `비밀번호가 틀렸음`});
    }
    const token = createJwtToken(user.id);
        return res.status(200).json({token, username});
}
        // if(bcrypt.compareSync(password, user.password)){
        //     //res.status(201).json(`${username} 로그인 완료`); //지우기
        //     res.status(201).header('Token', makeToken(username)).json(`${username} 로그인 완료`); //토큰값만들기 //추가
        // }
        // else{
        //     res.status(404).json({message: `${username}님 아이디 또는 비밀번호 확인하세요`})
        // }
    // }else{
    //      res.status(404).json({ message: `${username} 님 아이디 또는 비밀번호를 확인해주세요` });
    // }

//토큰 확인 삭제 
//export async function verify(req, res, next){
//    const token = req.header['Token'];
//    if(token){
//        res.status(200).json(token);
//   }
//}

//me 추가
export async function me(req, res, next){
    const user = await authRepository.findById(req.userId);
    if(!user){
        return res.status(404).json({message: `일치하는 사용자가 없음`});
    }
    res.status(200).json({token: req.token, username: user.username});
}
