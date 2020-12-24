import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取账号信息
export function getInfo(token) {
  return request({
    url: '/info',
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// 普通用户列表
export function common_list(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

// 拉黑、取消拉黑
export function user_black(data) {
  return request({
    url: '/user/black',
    method: 'post',
    data
  })
}

// 个人信息
export function userinfo(query) {
  return request({
    url: '/user/show',
    method: 'get',
    params: query
  })
}
