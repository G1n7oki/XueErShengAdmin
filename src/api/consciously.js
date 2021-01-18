import request from '@/utils/request'

// Plan list
export function plan_list(query) {
  return request({
    url: '/applies/index',
    method: 'get',
    params: query
  })
}
// Plan Detail
export function plan_detail(query) {
  return request({
    url: '/applies/details',
    method: 'get',
    params: query
  })
}
// Create plan
export function plan_create(data) {
  return request({
    url: '/applies/add',
    method: 'post',
    data
  })
}
// Update plan
export function plan_update(data) {
  return request({
    url: '/applies/edit',
    method: 'post',
    data
  })
}
