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
    meta: { title: '个人信息', noCache: true }
  }, {
    path: 'lesson',
    component: () => import('@/views/user/Lesson'),
    name: 'Lesson',
    meta: { title: '开课信息', noCache: true }
  }]
}

export default user
