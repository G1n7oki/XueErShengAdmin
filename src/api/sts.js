import request from '@/utils/request'

// 获取sts
export function sts(query) {
  return request({
    url: '/sts',
    method: 'get',
    params: query
  })
}
