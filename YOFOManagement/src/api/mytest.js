import request from '@/utils/request'

export function contactMe(query) {
    return request({
        url: '/api/mytest',
        method: 'get',
        params: query
    })
}

// get请求传参用 params字段
export function deleteContact(idx) {
    return request({
        url: '/api/mytest/delete',
        method: 'get',
        params: { idx }
    })
}