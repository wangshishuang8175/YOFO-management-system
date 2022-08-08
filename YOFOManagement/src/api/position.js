import request from '@/utils/request'

export function fetchPosition(query) {
    return request({
        url: '/api/position/list',
        method: 'get',
        params: query
    })
}

// get请求传参用 params字段
export function deletePosition(id) {
    return request({
        url: '/api/position/delete',
        method: 'get',
        params: { id }
    })
}

// post请求传参 用data字段
export function createPosition(data) {
    return request({
        url: '/api/position/create',
        method: 'post',
        data
    })
}