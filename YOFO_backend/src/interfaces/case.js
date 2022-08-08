const express = require('express');
const router = express.Router();
const cases = require("../model/cases")
const caseType = require("../model/caseType")
const {
    pinyin
} = require("pinyin-pro");
const Cases = require('../model/cases');

//获取案例
router.get("/api/cases", async (req, res) => {
    let result = await cases.find({})
    res.json({
        code: 0,
        data: result
    })
})


//新增案例
router.post("/api/cases/addcase", async (req, res) => {
    //console.log(req.body)
    let pinyinp = (val) => pinyin(val, {
        toneType: 'none',
        v: true
    }).replace(/\s+/g, '');
    let data = {
        name: req.body.name,
        href: pinyinp(req.body.name),
        type: req.body.type,
        img: req.body.img.map(item => item.url)
    }
    console.log(data, "data")

    const newCases = new cases(data)
    await newCases.save();
    // console.log(pinyinp) 
    res.json({
        code: 0,
        msg: "添加成功"
    })

})
//删除案例
router.post('/api/cases/delete', async (req, res) => {
    console.log(req.body.id)
    await Cases.findByIdAndDelete(req.body.id)
    res.json({
        code: 0,
        data: "删除成功"
    })
});

//获取案例类型
router.get("/api/cases/gettype", async (req, res) => {
    let result = await caseType.find({})
    // console.log(result,"ssss");
    res.json({
        code: 0,
        data: result
    })
})

module.exports = router;