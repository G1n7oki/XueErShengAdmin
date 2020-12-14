import request from '@/utils/request'

export function class_type_list(query) {
  return request({
    url: '/teach/type',
    method: 'get',
    params: query
  })
}
