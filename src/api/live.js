import request from '@/utils/request'

// Live list
export function live_list(query) {
  return request({
    url: '/sol/index',
    method: 'get',
    params: query
  })
}
// Live detail
export function live_detail(query) {
  return request({
    url: '/sol/details',
    method: 'get',
    params: query
  })
}
// Create live
export function live_create(data) {
  return request({
    url: '/sol/add',
    method: 'post',
    data
  })
}
// Update live
export function live_update(data) {
  return request({
    url: '/sol/edit',
    method: 'post',
    data
  })
}
// Delete live
export function live_delete(data) {
  return request({
    url: '/sol/del',
    method: 'post',
    data
  })
}
