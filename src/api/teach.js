import request from '@/utils/request'

// 教学分类
export function classify_list(query) {
  return request({
    url: '/teach/index',
    method: 'get',
    params: query
  })
}

// 添加教学分类
export function classify_create(data) {
  return request({
    url: '/teach/add',
    method: 'post',
    data
  })
}

// 查看教学分类
export function classify_read(query) {
  return request({
    url: '/teach/get',
    method: 'get',
    params: query
  })
}

// 编辑教学分类
export function classify_update(data) {
  return request({
    url: '/teach/edit',
    method: 'post',
    data
  })
}

// 删除教学分类
export function classify_delete(data) {
  return request({
    url: '/teach/delet',
    method: 'post',
    data
  })
}

// 课程班型
export function class_type_list(query) {
  return request({
    url: '/teach/course_type',
    method: 'get',
    params: query
  })
}

// 添加课程班型
export function class_type_create(data) {
  return request({
    url: '/teach/course_add',
    method: 'post',
    data
  })
}

// 查看课程班型
export function class_type_detail(query) {
  return request({
    url: '/teach/course_detail',
    method: 'get',
    params: query
  })
}

// 编辑课程班型
export function class_type_update(data) {
  return request({
    url: '/teach/course_edit',
    method: 'post',
    data
  })
}
