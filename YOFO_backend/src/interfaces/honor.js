const express = require("express");
const vertoken = require("../tools/token");
const mongoose = require("mongoose");
const router = express.Router();

const honors = [{
        id: 1,
        path: "https://www.yofomedical.com/wp-content/themes/yofo/images/zs1.jpg",
    },
    {
        id: 2,
        path: "https://www.yofomedical.com/wp-content/themes/yofo/images/zs2.jpg",
    },
    {
        id: 3,
        path: "https://www.yofomedical.com/wp-content/themes/yofo/images/zs3.jpg",
    },
    {
        id: 4,
        path: "https://www.yofomedical.com/wp-content/themes/yofo/images/zs4.jpg",
    },
    {
        id: 5,
        path: "https://www.yofomedical.com/wp-content/themes/yofo/images/zs5.jpg",
    },
    {
        id: 6,
        path: "https://www.yofomedical.com/wp-content/themes/yofo/images/zs6.jpg",
    },
    {
        id: 7,
        path: "https://www.yofomedical.com/wp-content/themes/yofo/images/zs7.jpg",
    },
    {
        id: 8,
        path: "https://www.yofomedical.com/wp-content/themes/yofo/images/zs8.jpg",
    },
    {
        id: 9,
        path: "https://www.yofomedical.com/wp-content/themes/yofo/images/zs9.jpg",
    },
];


router.get("/api/honor/list", async(req, res) => {
    let luan = await honors;
    let result = luan.sort(function(a, b) {
        return a.id - b.id;
    });
    res.json({
        code: 200,
        message: "获取菜单成功",
        // total: result.length,
        data: result,
    });
});

router.get("/api/honor/delete", (req, res) => {
    const id = req.query.id;
    let holist = honors;
    // console.log(id);
    // 在这里用数组写个删除方法，然后把删除后的数组写在data后面
    // console.log(holist);
    let index = holist.findIndex((item) => {
        if (item.id == id) {
            return item.id;
        }
        // console.log(item);
    });
    // console.log(index, "kk");
    holist.splice(index, 1);
    res.json({
        code: 200,
        message: "删除成功",
        data: holist,
    });
});

// 新建文章接口
router.post("/api/honor/create", (req, res) => {
    const data = req.body;
    honors.push(data);
    res.json({
        cose: 200,
        data: 'success',
    });
});


module.exports = router;