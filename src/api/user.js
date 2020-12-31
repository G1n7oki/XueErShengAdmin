import request from '@/utils/request'

// Login
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// Get account info
export function getInfo(token) {
  return request({
    url: '/info',
    method: 'get',
    params: { token }
  })
}

// Logout
export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// Common list
export function common_list(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

// Handle blacklist
export function user_black(data) {
  return request({
    url: '/user/black',
    method: 'post',
    data
  })
}

// User info
export function userinfo(query) {
  return request({
    url: '/user/show',
    method: 'get',
    params: query
  })
}

// Course information
export function course_info(query) {
  return request({
    url: '/user/userorder',
    method: 'get',
    params: query
  })
}

// vip student list
export function student_list(query) {
  return request({
    url: '/user/applies',
    method: 'get',
    params: query
  })
}
