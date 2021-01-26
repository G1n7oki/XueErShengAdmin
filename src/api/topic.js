import request from '@/utils/request'

// Topic list
export function topic_list(query) {
  return request({
    url: '/question/index',
    method: 'get',
    params: query
  })
}
// Topic detail
export function topic_detail(query) {
  return request({
    url: '/question/details',
    method: 'get',
    params: query
  })
}
// Delete Topic
export function delete_topic(data) {
  return request({
    url: '/question/del_question',
    method: 'post',
    data
  })
}
// Create Topic
export function create_topic(data) {
  return request({
    url: '/question/add',
    method: 'post',
    data
  })
}
// Update Topic
export function update_topic(data) {
  return request({
    url: '/question/edit',
    method: 'post',
    data
  })
}
// Topic option detail
export function topic_option_detail(query) {
  return request({
    url: '/question/option',
    method: 'get',
    params: query
  })
}
// Update topic option
export function update_topic_option(data) {
  return request({
    url: '/question/edit_option',
    method: 'post',
    data
  })
}
// Delete topic option
export function delete_topic_option(data) {
  return request({
    url: '/question/del_option',
    method: 'post',
    data
  })
}
