const express = require("express");
const router = express.Router();

const multer = require("multer")

// 指定存储位置
const storage = multer.diskStorage({
  // 存储位置
  destination(req, file, callback) {
    // 参数一 错误信息   参数二  上传路径（此处指定upload文件夹）
    callback(null, "upload")
  },
  // 确定文件名
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

// 得到multer对象  传入storage对象
const upload = multer({ storage })

router.get('/api/get', (req, res) => {
  res.json({
    code: 0,
    data: {
      name: 'hello world',
    },
  })
})

router.post('/api/post', (req, res) => {
  res.json({
    code: 0,
    data: {
      name: 'hello world',
    },
  })
})

router.get('/api/500', (req, res) => {
  res.status(500).json({
    code: 500,
    message: '内部错误',
    data: null,
  })
})

router.post("/api/upload/upImg", upload.single("file"), (req, res) => {
  const url = "http://localhost:3000/" + req.file.filename
  res.json({ url })
})

module.exports = router;