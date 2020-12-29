import request from '@/utils/request'

// Get sts
export function sts(query) {
  return request({
    url: '/sts',
    method: 'get',
    params: query
  })
}
