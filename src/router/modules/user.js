/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const user = {
  path: '/user',
  component: Layout,
  redirect: '/user',
  name: 'User',
  meta: {
    title: '用户管理',
    icon: 'peoples'
  },
  children: [{
    path: 'common',
    component: () => import('@/views/user/Common'),
    name: 'Common',
    meta: { title: '普通用户', noCache: true }
  }, {
    path: 'info',
    component: () => import('@/views/user/Info'),
    name: 'Info',
    meta: { title: '个人信息', noCache: true },
    hidden: true
  }, {
    path: 'lesson',
    component: () => import('@/views/user/Lesson'),
    name: 'Lesson',
    meta: { title: '开课信息', noCache: true },
    hidden: true
  }, {
    path: 'detail',
    component: () => import('@/views/user/Detail'),
    name: 'Detail',
    meta: { title: '学习详情', noCache: true },
    hidden: true
  }, {
    path: 'student',
    component: () => import('@/views/user/Student'),
    name: 'Student',
    meta: { title: '学员用户', noCache: true }
  }, {
    path: 'correction',
    component: () => import('@/views/user/Correction'),
    name: 'Correction',
    meta: { title: '题目纠错', noCache: true }
  }]
}

export default user
