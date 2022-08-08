import request from '@/utils/request'

export function fetchNews(query) {
    return request({
        url: '/api/news/list',
        method: 'get',
        params: query
    })
}

// get请求传参用 params字段
export function deleteNews(idx) {
    return request({
        url: '/api/news/delete',
        method: 'get',
        params: { idx }
    })
}

// post请求传参 用data字段
export function createNews(data) {
    return request({
        url: '/api/news/create',
        method: 'post',
        data
    })
}