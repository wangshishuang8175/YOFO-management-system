import request from '@/utils/request'

// 请求文化在哪个列表接口
export function fetchArticleList(query) {
    return request({
        url: '/api/exhibition/list',
        method: 'get',
        params: query
    })
}

// get请求传参用 params字段
export function deleteArticle(id) {
    return request({
        url: '/api/exhibition/delete',
        method: 'get',
        params: { id }
    })
}

// post请求传参 用data字段
// 新建文章接口
export function createArticle(data) {
    return request({
        url: '/api/exhibition/create',
        method: 'post',
        data
    })
}