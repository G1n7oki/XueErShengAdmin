import request from '@/utils/request'

// 发现评论管理
export function discover_comment_list(query) {
  return request({
    url: '/comments',
    method: 'get',
    params: query
  })
}

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
    url: 'article_update',
    method: 'post',
    data
  })
}

export function listDiscover(query) {
  return request({
    url: '/discover/list',
    method: 'get',
    params: query
  })
}

export function circle_list(query) {
  return request({
    url: '/circle/list',
    method: 'get',
    params: query
  })
}

export function circle_comment(query) {
  return request({
    url: '/circle/comment',
    method: 'get',
    params: query
  })
}
