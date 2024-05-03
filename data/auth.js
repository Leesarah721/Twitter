let users = [
    {
        id: '1',
        username: "apple",
        password: "$2b$10$/4lYMMsFC6rBSxlI1/qP5uwROuFZMtALVttv/2TbQ0bJXIFGeqPXe",
        name: "김사과",
        email: "apple@apple.com",
        url: "https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45.jpg"
    },
    
    {
        id: '2',
        username: "banana",
        password: "$2b$10$/4lYMMsFC6rBSxlI1/qP5uwROuFZMtALVttv/2TbQ0bJXIFGeqPXe",
        name: "반하나",
        email: "banana@banana.com",
        url: "https://img.freepik.com/premium-vector/banana-cute-kawaii-style-fruit-character-vector-illustration_787461-1772.jpg"
    }
];



//아이디 중복검사
export async function findByUsername(username){
    return users.find((user) => user.username === user.username);
}

//id 중복검사
export async function findById(id){
    return use.find((user) => user.id === id);
}


export async function createUser(user){ //매개변수 변경
    const created = {ud:'10', ... user} //created 정의
    // const user ={
    //     id: "10",
    //     username,
    //     password,
    //     name,
    //     email,
    //     url: "https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45.jpg"
    // }
    users.push(created) //push 
    return created.id;
}

export async function login(username){
    return users.find((users) => users.username === username);
}