const express = require("express");
const vertoken = require('../tools/token')

const Position = require("../model/position");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/api/position/list", async(req, res) => {
    let luan = await Position.find();
  let result = luan.sort(function (a, b) {
    return a.id - b.id;
  });
    const { current = 1, size = 20 } = req.query;
    const pageList = result.filter((item, index) => index < size * current && index >= size * (current - 1))
    res.json({
        code: 200,
        data: pageList,
        total:result.length,
        message: "获取菜单成功"
    })
})

router.get("/api/position/delete", async(req, res) => {
    const myid = req.query.id;
    await Position.remove({ id: myid });
    res.json({
        code: 200,
        message: '删除成功'
    })
})

router.post("/api/position/create",async(req,res)=>{
const data=req.body;
console.log(data,"qqqqqyttttttt");
let positions= new Position({
  _id: new mongoose.Types.ObjectId(),
  id:data.id,
  title1: data.title1,
  description1: data.description1,
  description2: data.description2,
  email:data.email,
  img: data.img,
  // content: datanews.content,
});

positions.save(function (err, positions) {
  if (err) {
    res.send(err.message);
    return;
  }
  res.json({
    code: 200,
    message: "success",
  });
});
});


module.exports = router;






