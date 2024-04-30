import * as bcrypt from "bcrypt";

const password = 'abcd1234';
const hashed = bcrypt.hashSync(password, 10) 
//hashSync(매개변수, 솔트값) // 솔트값: 숫자가 높을 수록 속도가 느림 // 10이하 추천
console.log(`password: ${password}, hashed: ${hashed}`);


const result = bcrypt.compareSync('abcd1234',hashed);
console.log(result);
