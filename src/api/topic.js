import request from '@/utils/request'

// Topic list
export function topic_list(query) {
  return request({
    url: '/question/index',
    method: 'get',
    params: query
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
