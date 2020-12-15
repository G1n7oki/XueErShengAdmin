import request from '@/utils/request'

// 发现评论管理
export function discover_comment_list(query) {
  return request({
    url: '/comments',
    method: 'get',
    params: query
  })
}

export function listArticle(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
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
