//import { db } from '../db/database.js';
import SQ from 'sequelize'; 
import { sequelize } from '../db/database.js';
import { User } from './auth.js';
const DataTypes = SQ.DataTypes;
const Sequelize = sequelize;


const INCLUDE_USER = {
    attributes: [
        'id',
        'text',
        'createdAt',
        'userId',
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('user.url'), 'url']
    ],
    include: {
        model: User,
        attributes: [],
    }
}
const ORDER_DESC = {
    order: [['createdAt', 'DESC']]
}
const Tweet = sequelize.define('tweet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, { timestamps: false });
Tweet.belongsTo(User);

// const SELECT_JOIN = 'select tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw join users as us on tw.userId = us.id';

// const ORDER_DESC = 'order by tw.createdAt desc';

// 모든 트윗을 리턴(1)
// export async function getAll() {
//     return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => {
//         console.log(result);
//         return result;
//     });
// }

// 모든 트윗을 리턴(2)
export async function getAll() {
    return Tweet.findAll({...INCLUDE_USER, ...ORDER_DESC});
}

// 해당 아이디에 대한 트윗을 리턴(1)
// export async function getAllByUsername(username){
//     return db.execute(`${SELECT_JOIN} where username = ? ${ORDER_DESC}`, [username]).then((result) => {
//         console.log(result);
//         return result;
//     });
// }

// 해당 아이디에 대한 트윗을 리턴(2)
export async function getAllByUsername(username){
    return Tweet.findAll({...INCLUDE_USER, ...ORDER_DESC, include:{
        ...INCLUDE_USER.include, where: {username}
    }});
}


// 글번호에 대한 트윗을 리턴(1)
// export async function getById(id){
//     return db.execute(`${SELECT_JOIN} where tw.id = ? ${ORDER_DESC}`, [id]).then((result) => {
//         console.log(result);
//         return result;
//     });
// }

// 글번호에 대한 트윗을 리턴(2)
export async function getById(id){
    return Tweet.findOne({ where : {id}, ...INCLUDE_USER});
}


// 트윗을 작성(1)
// export async function create(text, userId){
//     return db.execute('insert into tweets (text, userId) values (?, ?)', [text, userId]).then((result) => {
//         console.log(result);
//         return getById(result[0].insertId);
//     });
// }

// 트윗을 작성(2)
export async function create(text, userId){
    return Tweet.create({text, userId}).then((data) => this.getById(data.dataValues.id));
}

// 트윗을 변경(1)
// export async function update(id, text){
//     return db.execute('update tweets set text = ? where id = ?', [text, id]).then((result) => {
//         console.log(result);
//         return getById(id);
//     });
// }

// 트윗을 변경(2)
export async function update(id, text){
    return Tweet.findByPk(id, INCLUDE_USER).then((tweet)=>{
        tweet.text = text;
        return tweet.save();
    })
}


// 트윗을 삭제(1)
// export async function remove(id){
//     return db.execute('delete from tweets where id = ?', [id]);
// }

// 트윗을 삭제(2)
export async function remove(id){
    return Tweet.findByPk(id).then((tweet)=>{
        tweet.destroy();
    });
}







