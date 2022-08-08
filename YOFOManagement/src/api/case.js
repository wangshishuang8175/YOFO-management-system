import request from '@/utils/request'

export const caseGet = (data) => {
    return request({
        url: `/api/cases`,
        method: 'get',
        data: data,
    })
}

export const caseAdd = (data) => {
    return request({
        url: `/api/cases/addcase`,
        method: 'post',
        data: data,
    })
}

export const caseDelete = (data) => {
    return request({
        url: `/api/cases/delete`,
        method: 'post',
        data: data,
    })
}
export const caseType = (data) => {
    return request({
        url: `/api/cases/gettype`,
        method: 'get',
        data: data,
    })
}