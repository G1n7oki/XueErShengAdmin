import request from '@/utils/request'

// Banner list
export function banner_list(query) {
  return request({
    url: '/banner/index',
    method: 'get',
    params: query
  })
}
// Create banner
export function banner_create(data) {
  return request({
    url: '/banner/add',
    method: 'post',
    data
  })
}
// Update banner
export function banner_update(data) {
  return request({
    url: '/banner/edit',
    method: 'post',
    data
  })
}
// Delete banner
export function banner_delete(data) {
  return request({
    url: '/banner/delete',
    method: 'post',
    data
  })
}

