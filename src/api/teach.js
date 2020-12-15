import request from '@/utils/request'

// 教学分类
export function classify_list(query) {
  return request({
    url: '/teach/index',
    method: 'get',
    params: query
  })
}

// 课程班型
export function class_type_list(query) {
  return request({
    url: '/teach/type',
    method: 'get',
    params: query
  })
}
