// CommonJS 모듈 예제 - 사용자 서비스

// private 변수 (모듈 스코프 내에서만 접근 가능)
const users = [];
let nextId = 1;

// private 함수
function validateUser(user) {
    return user.name && user.email;
}

// 외부로 공개할 함수들
function addUser(user) {
    if (!validateUser(user)) {
        throw new Error('Invalid user data');
    }
    user.id = nextId++;
    users.push(user);
    return user;
}

function getUser(id) {
    return users.find(user => user.id === id);
}

function getAllUsers() {
    return [...users];
}

// CommonJS 방식으로 함수들을 외부로 공개
module.exports = {
    addUser,
    getUser,
    getAllUsers
};

// 또는 개별적으로도 export 가능:
// module.exports.addUser = addUser;
// module.exports.getUser = getUser;
// module.exports.getAllUsers = getAllUsers;
