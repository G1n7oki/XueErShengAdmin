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
// Update chapter
export function chapter_update(data) {
  return request({
    url: '/chapter/edit',
    method: 'post',
    data
  })
}
// Update chapter video
export function chapter_video_update(data) {
  return request({
    url: '/chapter/video',
    method: 'post',
    data
  })
}
// Create chapter
export function chapter_create(data) {
  return request({
    url: '/chapter/add',
    method: 'post',
    data
  })
}

// Lecturer list
export function lecturer_list(query) {
  return request({
    url: '/teacher/index',
    method: 'get',
    params: query
  })
}
// Create lecturer
export function lecturer_create(data) {
  return request({
    url: '/teacher/add',
    method: 'post',
    data
  })
}
// Update lecturer
export function lecturer_update(data) {
  return request({
    url: '/teacher/edit',
    method: 'post',
    data
  })
}
// Lecturer detail
export function lecturer_detail(query) {
  return request({
    url: '/teacher/details',
    method: 'get',
    params: query
  })
}
