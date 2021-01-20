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

// Gift list
export function gift_list(query) {
  return request({
    url: '/gift/index',
    method: 'get',
    params: query
  })
}
// Create gift
export function gift_create(data) {
  return request({
    url: '/gift/add',
    method: 'post',
    data
  })
}
// Update gift
export function gift_update(data) {
  return request({
    url: '/gift/edit',
    method: 'post',
    data
  })
}

// Manage list
export function manage_list(query) {
  return request({
    url: '/applies/manage',
    method: 'get',
    params: query
  })
}

// Transcript list
export function transcript_list(query) {
  return request({
    url: '/applies/report_cards',
    method: 'get',
    params: query
  })
}
