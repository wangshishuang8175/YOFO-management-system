import request from '@/utils/request'

// 获取荣誉
export const getHonorList = () => {
        return request({
            url: '/api/honor/list',
            method: 'get',
            // params,
        })
    }
    //删除荣誉
export const deleteHonor = (id) => {
    return request({
        url: '/api/honor/delete',
        method: 'get',
        params: { id }
    })
}


//增加荣誉
// export const createHonor = (data) => {
//     return request({
//         url: '/api/honor/create',
//         method: 'post',
//         data
//     })
// }

export function createHonor(data) {
    return request({
        url: '/api/honor/create',
        method: 'post',
        data
    })
}


export const UploadImage = data => {
    return request({
        url: '/api/upload/upImg',
        method: 'post',
        data: data,
    })
}