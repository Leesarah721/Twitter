// import { db } from '../db/database.js'; //삭제
import SQ from 'sequelize';//추가
import { sequelize } from '../db/database.js';  //추가
const DataTypes = SQ.DataTypes; //추가


export const User = sequelize.define(
    'user',  // 테이블이름으로 만들어짐, s를 자동으로 붙임
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        url: DataTypes.STRING(1000)
    },
    { timestamps: false }
);

//아이디 (username) 중복검사
export async function findByUsername(username){
    // return db.execute('select * from users where username = ?', [username]).then((result) => {
    //     console.log(result);
    //     return result[0][0];
    // });
    return User.findOne({where: {username}}); //username일치 가져와

}

//id 중복검사
export async function findById(id){
    // return db.execute('select * from users where id = ?', [id]).then((result) => {
    //     console.log(result);
    //     return result[0][0];
    // });
    return User.findByPk(id);
}

//회원가입
export async function createUser(user){
    // console.log(user);
    // const {username, hashed, name, email, url} = user;
    // return db.execute('insert into users (username, password, name, email, url) values (?, ?, ?, ?, ?)', [username, hashed, name, email, url]).then((result) => {
    //     console.log(result);    // result[0].insertId
    //     return result[0].insertId;
    // });
    return User.create(user).then((data) => data.dataValues.id)
}

// //로그인
// export async function login(username){
//     return users.find((users) => users.username === username);
// }