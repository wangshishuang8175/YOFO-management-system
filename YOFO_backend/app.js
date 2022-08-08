const express = require("express")
const bodyParser = require('body-parser')
const path = require("path")
const mongoose = require("mongoose")
const login = require("./src/interfaces/login")
const menu = require("./src/interfaces/menu")
const test = require("./src/interfaces/test")
const news = require("./src/interfaces/news")
const mytest = require("./src/interfaces/mytest")
const exhibition = require("./src/interfaces/exhibition")
const position = require("./src/interfaces/position")
const honor = require("./src/interfaces/honor");
const cases = require("./src/interfaces/case")
//引入插件
const vertoken = require('./src/tools/token')
const expressJwt = require('express-jwt').expressjwt

const app = express();

//引入数据库
mongoose.connect("mongodb://localhost/YOFO")
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("已经连接数据库");
});

// app.use(express.static("upload"))
app.use(express.static("upload/cases"))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")))

//引入token
app.use(expressJwt({
    secret: 'hello_token',
    algorithms: ['HS256']
}).unless({
    //用户第一次登录的时候不需要验证token
    path: ['/api/login']  //不需要验证的接口名称
}))

//解析token获取用户信息
app.use(function (req, res, next) {
    var token = req.headers['authorization'];
    if (token == undefined) {
        return next();
    } else {
        vertoken.getToken(token).then((data) => {
            req.data = data;
            return next();
        }).catch((error) => {
            return next();
        })
    }
});

app.use(login)
app.use(menu)
app.use(test)
app.use(news)
app.use(mytest)
app.use(exhibition)
app.use(position)
app.use(honor)
app.use(cases)
//token失效返回信息
app.use(function (err, req, res, next) {
    if (err.status == 401) {
        // return res.status(401).send('token失效')
        //可以设置返回json 形式  
        res.json({ status: 401, message: 'token失效' })
    }
})

app.listen(5000, () => {
    console.log("5000端口已启用")
})