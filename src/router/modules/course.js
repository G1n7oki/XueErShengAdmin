/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const course = {
  path: '/course',
  component: Layout,
  redirect: '/course',
  name: 'Course',
  meta: {
    title: '课程管理',
    icon: 'skill'
  },
  children: [{
    path: 'center',
    component: () => import('@/views/course/Center'),
    name: 'Center',
    meta: { title: '课程中心', noCache: true }
  }, {
    path: 'course-info',
    component: () => import('@/views/course/CourseInfo'),
    name: 'CourseInfo',
    meta: { title: '课程信息', noCache: true }
  }, {
    path: 'evaluate',
    component: () => import('@/views/course/Evaluate'),
    name: 'Evaluate',
    meta: { title: '课程评价', noCache: true }
  }]
}

export default course
