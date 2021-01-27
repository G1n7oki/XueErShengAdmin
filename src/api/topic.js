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
// Topic all profession
export function topic_all(query) {
  return request({
    url: '/question/all',
    method: 'get',
    params: query
  })
}

// Paper list
export function paper_list(query) {
  return request({
    url: '/question/paper',
    method: 'get',
    params: query
  })
}
// Create paper
export function create_paper(data) {
  return request({
    url: '/question/add_paper',
    method: 'post',
    data
  })
}
// Update paper
export function update_paper(data) {
  return request({
    url: '/question/edit_paper',
    method: 'post',
    data
  })
}
// Delete paper
export function delete_paper(data) {
  return request({
    url: '/question/del_paper',
    method: 'post',
    data
  })
}
// Paper all
export function paper_all(query) {
  return request({
    url: '/question/all_paper',
    method: 'get',
    params: query
  })
}

// Practice list
export function practice_list(query) {
  return request({
    url: '/question/refine',
    method: 'get',
    params: query
  })
}
// Create practice
export function create_practice(data) {
  return request({
    url: '/question/add_refine',
    method: 'post',
    data
  })
}
// Update practice
export function update_practice(data) {
  return request({
    url: '/question/edit_refine',
    method: 'post',
    data
  })
}
// Delete practice
export function delete_practice(data) {
  return request({
    url: '/question/del_refine',
    method: 'post',
    data
  })
}
