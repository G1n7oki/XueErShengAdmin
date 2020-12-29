import request from '@/utils/request'

// Create Video
export function video_create(data) {
  return request({
    url: '/video/add',
    method: 'post',
    data
  })
}
// Video list
export function video_list(query) {
  return request({
    url: '/video/index',
    method: 'get',
    params: query
  })
}
// Update video
export function video_update(data) {
  return request({
    url: '/video/edit',
    method: 'post',
    data
  })
}
