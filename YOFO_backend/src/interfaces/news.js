const express = require("express");
const vertoken = require("../tools/token");
const Mynews = require("../model/news");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/api/news/list", async (req, res) => {
  let luan = await Mynews.find();
  let result = luan.sort(function (a, b) {
    return a.idx - b.idx;
  });
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

router.get("/api/news/delete", async (req, res) => {
  // let result = await Mynews.find();
  const myidx = req.query.idx;
  // console.log(myidx, "dsdsdsd");
  // 根据条件只删一个
  // Mynews.findOneAndRemove({idx:myidx}).then(function (data) {
  //   //删除的那个元素
  //   // console.log(data);
  // });

  // 先找到一个元素再根据_id删除所有
  // await Mynews.findOne({ idx: myidx }).then(function (mydata) {
  //   // console.log(mydata);
  //   Mynews.findByIdAndDelete(mydata._id).then(function (data) {
  //     //删除的那个元素
  //     // console.log(data);
  //   });
  // });
  await Mynews.remove({ idx: myidx });
  // await Mynews.find({idx: 2}).then(function (datas) {
  //     // console.log(datas,"adsasa");
  //     datas.forEach(item=>{
  //       console.log(item.idx,"dwwewwwww");
  //       if (item.idx==1) {
  //         console.log(item,"111");
  //       }
  //     })
  //     });
  // let neew = await Mynews.remove({ idx: myidx });

  res.json({
    code: 200,
    message: "删除成功",
  });
});

router.post("/api/news/create", (req, res) => {
  const datanews = req.body;
  // console.log(datanews,"qqqqq");
  let newss = new Mynews({
    _id: new mongoose.Types.ObjectId(),
    idx:datanews.idx,
    title: datanews.title,
    newsdate: datanews.newsdate,
    abstracts: datanews.abstracts,
    img: datanews.img,
    content: datanews.content,
  });

  newss.save(function (err, newss) {
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
