import request from '@/utils/request'

// Course list
export function course_list(query) {
  return request({
    url: '/course/index',
    method: 'get',
    params: query
  })
}
// Create course
export function course_create(data) {
  return request({
    url: '/course/add',
    method: 'post',
    data
  })
}
// Course detail
export function course_detail(query) {
  return request({
    url: '/course/details',
    method: 'get',
    params: query
  })
}
// Course update
export function course_update(data) {
  return request({
    url: '/course/edit',
    method: 'post',
    data
  })
}

// Course comment list
export function course_comment(query) {
  return request({
    url: '/course/judge',
    method: 'get',
    params: query
  })
}

// Delete course comment
export function comment_delete(data) {
  return request({
    url: '/course/judge_del',
    method: 'post',
    data
  })
}

export function course_type(query) {
  return request({
    url: '/course/course_type',
    method: 'get',
    params: query
  })
}
