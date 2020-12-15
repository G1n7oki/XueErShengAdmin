import request from '@/utils/request'

export function profession_list(query) {
  return request({
    url: '/professions',
    method: 'get',
    params: query
  })
}
