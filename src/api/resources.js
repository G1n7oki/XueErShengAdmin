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

// Handout list
export function handout_list(query) {
  return request({
    url: '/handout/index',
    method: 'get',
    params: query
  })
}

// Handout into the database
export function handout_create(data) {
  return request({
    url: '/handout/add',
    method: 'post',
    data
  })
}

// Update handout
export function handout_update(data) {
  return request({
    url: '/handout/edit',
    method: 'post',
    data
  })
}

// Chapter list
export function chapter_list(query) {
  return request({
    url: '/chapter/index',
    method: 'get',
    params: query
  })
}
