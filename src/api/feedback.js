import request from '@/utils/request'

// Help list
export function help_list(query) {
  return request({
    url: '/help/index',
    method: 'get',
    params: query
  })
}
// Create help
export function help_create(data) {
  return request({
    url: '/help/add',
    method: 'post',
    data
  })
}
// Update help
export function help_update(data) {
  return request({
    url: '/help/edit',
    method: 'post',
    data
  })
}
// Delete help
export function help_delete(data) {
  return request({
    url: '/help/delete',
    method: 'post',
    data
  })
}

// Feedback list
export function feedback_list(query) {
  return request({
    url: '/feedback/index',
    method: 'get',
    params: query
  })
}
// Update feedback
export function feedback_update(data) {
  return request({
    url: '/feedback/edit',
    method: 'post',
    data
  })
}
