import request from '@/utils/request'

// Question list
export function question_list(query) {
  return request({
    url: '/faq/index',
    method: 'get',
    params: query
  })
}
// Question detail
export function question_detail(query) {
  return request({
    url: '/faq/details',
    method: 'get',
    params: query
  })
}
// Question reply
export function question_reply(data) {
  return request({
    url: '/faq/reply',
    method: 'post',
    data
  })
}
// Delete question
export function question_delete(data) {
  return request({
    url: '/faq/delete',
    method: 'post',
    data
  })
}

// Answer list
export function answer_list(query) {
  return request({
    url: '/faq/answer',
    method: 'get',
    params: query
  })
}
// Delete answer
export function answer_delete(data) {
  return request({
    url: '/faq/delete_reply',
    method: 'post',
    data
  })
}
