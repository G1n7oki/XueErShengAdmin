import request from '@/utils/request'

// Course list
export function course_list(query) {
  return request({
    url: '/course/index',
    method: 'get',
    params: query
  })
}
