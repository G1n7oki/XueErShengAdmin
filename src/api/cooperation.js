import request from '@/utils/request'

// Consciously list
export function consciously_list(query) {
  return request({
    url: '/school/index',
    method: 'get',
    params: query
  })
}
