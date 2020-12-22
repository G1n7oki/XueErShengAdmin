import request from '@/utils/request'

// 文章列表
export function article_list(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// 添加文章
export function article_create(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

// 文章删除
export function article_delete(data) {
  return request({
    url: '/article/delete',
    method: 'post',
    data
  })
}

// 文章编辑
export function article_update(data) {
  return request({
    url: '/article/edit',
    method: 'post',
    data
  })
}

// 文章详情
export function article_read(query) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: query
  })
}

// 发现列表
export function discover_list(query) {
  return request({
    url: '/article/discover',
    method: 'get',
    params: query
  })
}

// 发现评论列表
export function discover_comment_list(query) {
  return request({
    url: '/comments',
    method: 'get',
    params: query
  })
}

// 发现评论删除
export function discover_comment_delete(data) {
  return request({
    url: '/article/del_comment',
    method: 'post',
    data
  })
}

// 图片删除
export function image_delete(data) {
  return request({
    url: '/article/del_image',
    method: 'post',
    data
  })
}

// 圈子列表
export function circle_list(query) {
  return request({
    url: '/article/circle',
    method: 'get',
    params: query
  })
}

// 圈子评论列表
export function circle_comment(query) {
  return request({
    url: '/article/circle_comment',
    method: 'get',
    params: query
  })
}
