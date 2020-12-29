import request from '@/utils/request'

// Profession list
export function profession_list(query) {
  return request({
    url: '/professions',
    method: 'get',
    params: query
  })
}
