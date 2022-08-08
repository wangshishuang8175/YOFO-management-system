
import request from '@/utils/request'

// 登录接口
export const UploadImage = data => {
    console.log(data, "xxxxxxxxxxxxxx")
    return request({
        url: '/api/upload/upImg',
        method: 'post',
        data: data,
    })
}

