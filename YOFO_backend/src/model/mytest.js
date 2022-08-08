const mongoose = require("mongoose");

const mytestScheme = mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId
  },
    nickname: {
      type: String,
      required: [true, '用户名不能为空'],
      minlength: [2, '最小长度为2'],
      maxlength: [10, '最大长度为10']
    },
    email: {
      type: String,
      validate: {
          validator: function (v) {
              return /^\w+@\w+\.\w+(\.\w+)?$/.test(v);
          },
          message: "邮箱格式不正确"
      },
      required: [true, '邮箱不能为空']
    },

    phonenumber: {
      type: Number,
    },
    job: {
      type: String,
    },
    leaveword: {
      type: String,
    },
  }
//  ,{versionKey:false}   _v字段
);

const Mytest = mongoose.model("mytest", mytestScheme, "mytest");
module.exports = Mytest;
