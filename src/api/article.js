import request from '@/utils/request'

// Article list
export function article_list(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// Create article
export function article_create(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

// Delete article
export function article_delete(data) {
  return request({
    url: '/article/delete',
    method: 'post',
    data
  })
}

// Update article
export function article_update(data) {
  return request({
    url: '/article/edit',
    method: 'post',
    data
  })
}

// Article detail
export function article_read(query) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: query
  })
}

// Discover list
export function discover_list(query) {
  return request({
    url: '/article/discover',
    method: 'get',
    params: query
  })
}

// Discover comment list
export function discover_comment_list(query) {
  return request({
    url: '/comments',
    method: 'get',
    params: query
  })
}

// Delete discover comment
export function discover_comment_delete(data) {
  return request({
    url: '/article/del_comment',
    method: 'post',
    data
  })
}

// Delete image
export function image_delete(data) {
  return request({
    url: '/article/del_image',
    method: 'post',
    data
  })
}

// Circle list
export function circle_list(query) {
  return request({
    url: '/article/circle',
    method: 'get',
    params: query
  })
}

// Circle comment list
export function circle_comment(query) {
  return request({
    url: '/article/circle_comment',
    method: 'get',
    params: query
  })
}
