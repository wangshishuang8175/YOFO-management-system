const express = require("express");
const vertoken = require('../tools/token')
const router = express.Router();


const mockList = [{
        "id": 1,
        "title": "2022中国东北国际口腔器材展览会",
        "address": "中国·沈阳",
        "date": "2022年03月22日-2022年03月25日",
    },
    {
        "id": 2,
        "title": "2022西部国际口腔展",
        "address": "中国·成都",
        "date": "2022年04月20日-2022年04月23日",
    },
    {
        "id": 3,
        "title": "2022华南国际口腔展",
        "address": "中国·广州",
        "date": "2022年03月02日-2022年03月05日",
    },
    {
        "id": 4,
        "title": "2021云南国际口腔展",
        "address": "中国·昆明",
        "date": "2022年11月26日-2022年11月28日",
    },
    {
        "id": 5,
        "title": "2021中部国际口腔展",
        "address": "中国·武汉",
        "date": "2022年11月11日-2022年11月13日",
    },
    {
        "id": 6,
        "title": "2021中国国际口腔器材展览会（DTC）",
        "address": "中国·上海",
        "date": "2022年11月03日-2022年11月06日",
    },
    {
        "id": 7,
        "title": "2021湖南口腔医学大会",
        "address": "中国·长沙",
        "date": "2022年10月17日-2022年10月19日",
    },
    {
        "id": 8,
        "title": "2021中国国际口腔设备材料展览会",
        "address": "中国·沈阳",
        "date": "2022年03月22日-2022年03月25日",
    },
    {
        "id": 9,
        "title": "2022中国东北国际口腔器材展览会",
        "address": "中国·北京",
        "date": "2022年月06月09日-2022年06月12日",
    },
]

// 文章列表接口
router.get("/api/exhibition/list", (req, res) => {
    // 当前页码 和 每页总显示条数
    const { current = 1, size = 20 } = req.query;
    // 拿到当前页码对应的数据
    const pageList = mockList.filter((item, index) => index < size * current && index >= size * (current - 1))
        // 数据返回给前台
    res.json({
        code: 0,
        data: pageList,
        total: mockList.length
    })
})

// 删除接口
router.get("/api/exhibition/delete", (req, res) => {
    // 拿到id
    const id = req.query.id;
    // 根据id来删除
    const index = mockList.findIndex(item => {
        if (item.id == id) {
            return true;
        }
    })
    mockList.splice(index, 1)
        // 返回数据
    res.json({
        code: 0,
        data: '删除成功'
    })
})

// 新建文章接口
router.post("/api/exhibition/create", (req, res) => {
    const data = req.body;
    mockList.push(data);
    res.json({
        code: 0,
        data: 'success'
    })
})

module.exports = router;