import jwt from 'jsonwebtoken';

const secret='abcdefg1234%^&*';

const token = jwt.sign(
    {
        id:'apple',
        isAdmin:false
    },
    secret,
    {expiresIn: "1h"} // 얼마만큼 토근이 유지될 것인가 
);

//expiresIn: "1h"
//expiresIn: 2 유지되다 에러

setTimeout(()=>{
    jwt.verify(token,secret,(error,decoded)=>{
        console.log(error,decoded);
    });
}, 3000); // 3초마다 찍어주기

console.log(token);

// 일단 토큰찍고 4초 뒤에 set timeout에서 토큰, 시크릿 확인해보니 에러
// (4초 지나서 만료시간 지남 jwt expired)
// 2초로 바꾸면 decoded 잘 뜸