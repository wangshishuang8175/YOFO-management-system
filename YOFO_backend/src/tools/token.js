const jwt = require('jsonwebtoken');
const jwtScrect = 'hello_token';  //签名


//登录接口 生成token的方法
const setToken = function (userName, password) {
    return new Promise((resolve, reject) => {
        //expiresln 设置token过期的时间
        const token = jwt.sign({ userName, password }, jwtScrect, { expiresIn: '24h' });
        resolve(token)
    })
}
//各个接口需要验证token的方法
const getToken = function (token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            console.log('token是空的')
            reject({
                error: 'token 是空的'
            })
        }
        else {
            //第二种  改版后的
            var info = jwt.verify(token.split(' ')[1], jwtScrect);
            resolve(info);  //解析返回的值（sign 传入的值）
        }
    })
}

module.exports = {
    setToken,
    getToken
}