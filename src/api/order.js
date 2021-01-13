import request from '@/utils/request'

// Order list
export function order_list(query) {
  return request({
    url: '/order/index',
    method: 'get',
    params: query
  })
}
// Order detail
export function order_detail(query) {
  return request({
    url: '/order/details',
    method: 'get',
    params: query
  })
}
// Update order
export function order_update(data) {
  return request({
    url: '/order/cancel',
    method: 'post',
    data
  })
}
// Delete order
export function order_delete(data) {
  return request({
    url: '/order/delete',
    method: 'post',
    data
  })
}
