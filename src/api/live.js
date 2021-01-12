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

// Live package list
export function live_package_list(query) {
  return request({
    url: '/live/index',
    method: 'get',
    params: query
  })
}
// Live package detail
export function live_package_detail(query) {
  return request({
    url: '/live/details',
    method: 'get',
    params: query
  })
}
// Create live
export function live_package_create(data) {
  return request({
    url: '/live/add',
    method: 'post',
    data
  })
}
// Update live
export function live_package_update(data) {
  return request({
    url: '/live/edit',
    method: 'post',
    data
  })
}
// Delete live package
export function live_package_delete(data) {
  return request({
    url: '/live/del',
    method: 'post',
    data
  })
}
