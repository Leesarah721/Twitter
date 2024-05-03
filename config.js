import dotenv from 'dotenv';

dotenv.config();

function required(key, defaultValue=undefined){
    const value = process.env[key] || defaultValue
    // process.env() : 시스템에 접근 관련한 모듈 
    // env 다룰 수 있는 기능이 들어있음 
    // 먼저 전달받은 키가 있는지 확인,
    // or 앞의 값이 True로 판별되면 앞의 값이 대입,
    // or 앞의 값이 False로 판별되면 뒤의 값이 대입
    if(value == null){
        throw new Error(`키 ${key}는 undefined!!`);
    }
    return value;
}

//외부에서 가져다 쓸 수 있게 작성
export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 172800))
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 10))
    },
    host: {
        port: parseInt(required('HOST_PORT', 8080))
    }
}