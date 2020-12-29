import request from '@/utils/request'

// Classify list
export function classify_list(query) {
  return request({
    url: '/teach/index',
    method: 'get',
    params: query
  })
}

// Create classify
export function classify_create(data) {
  return request({
    url: '/teach/add',
    method: 'post',
    data
  })
}

// Classify detail
export function classify_read(query) {
  return request({
    url: '/teach/get',
    method: 'get',
    params: query
  })
}

// Update classify
export function classify_update(data) {
  return request({
    url: '/teach/edit',
    method: 'post',
    data
  })
}

// Delete classify
export function classify_delete(data) {
  return request({
    url: '/teach/delet',
    method: 'post',
    data
  })
}

// Class type list
export function class_type_list(query) {
  return request({
    url: '/teach/course_type',
    method: 'get',
    params: query
  })
}

// Create class type
export function class_type_create(data) {
  return request({
    url: '/teach/course_add',
    method: 'post',
    data
  })
}

// Class type detail
export function class_type_detail(query) {
  return request({
    url: '/teach/course_detail',
    method: 'get',
    params: query
  })
}

// Update class type
export function class_type_update(data) {
  return request({
    url: '/teach/course_edit',
    method: 'post',
    data
  })
}
