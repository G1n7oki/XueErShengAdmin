import request from '@/utils/request'

// Consciously list
export function consciously_list(query) {
  return request({
    url: '/school/index',
    method: 'get',
    params: query
  })
}
// Create consciously
export function consciously_create(data) {
  return request({
    url: '/school/add',
    method: 'post',
    data
  })
}
// Update consciously
export function consciously_update(data) {
  return request({
    url: '/school/edit',
    method: 'post',
    data
  })
}

// Area list
export function area_list(query) {
  return request({
    url: '/area/index',
    method: 'get',
    params: query
  })
}
// Create area
export function area_create(data) {
  return request({
    url: '/area/add_area',
    method: 'post',
    data
  })
}
// Update area
export function area_update(data) {
  return request({
    url: '/area/edit_area',
    method: 'post',
    data
  })
}

// Major list
export function major_list(query) {
  return request({
    url: '/profession/index',
    method: 'get',
    params: query
  })
}
// Create major
export function major_create(data) {
  return request({
    url: '/profession/add_profession',
    method: 'post',
    data
  })
}
// Update major
export function major_update(data) {
  return request({
    url: '/profession/edit_profession',
    method: 'post',
    data
  })
}
