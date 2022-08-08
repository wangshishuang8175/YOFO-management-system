const express = require("express");
const vertoken = require("../tools/token");
const Mytest = require("../model/mytest");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/api/mytest", async (req, res) => {
  let result = await Mytest.find();
  const { current = 1, size = 20 } = req.query;
  const pageList = result.filter(
    (item, index) => index < size * current && index >= size * (current - 1)
  );
  res.json({
    code: 200,
    message: "获取菜单成功",
    total: result.length,
    data: pageList,
  });
});

router.get("/api/mytest/delete", async (req, res) => {
  const myidx = req.query.idx;
  // console.log(myidx, "dsdsdsd");
  // 根据_id删除所有
  await Mytest.findByIdAndDelete(myidx).then(function (data) {
      //删除的那个元素
      // console.log(data);
    });

  res.json({
    code: 200,
    message: "删除成功",
  });
});
router.get("/api/mytest/serach", async (req, res) => {
  const mytext = req.query.text;
  // console.log(myidx, "dsdsdsd");
//  过滤器查找，返回数据
const xx ="罡"
let listm = await Mytest.find();
// for (let i = 0; i < listm.length; i++) {
//   if (listm[i].nickname.indexOf(xx) != -1) {
//     var serchlist = listm[i];
//     console.log(serchlist);
//     return serchlist
//     break;
// }else{
//   continue
// }
// }
// console.log(serchlist,"sss");
  res.json({
    code: 200,
    message: "查找成功",
    data:listm
  });
});
module.exports = router;
