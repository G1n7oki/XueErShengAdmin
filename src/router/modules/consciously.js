/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const consciously = {
  path: '/consciously',
  component: Layout,
  redirect: '/consciously/list',
  name: 'Consciously',
  meta: {
    title: '报考管理',
    icon: 'tree-table'
  },
  children: [{
    path: 'plan',
    component: () => import('@/views/consciously/Plan'),
    name: 'Plan',
    meta: { title: '报考计划', noCache: true }
  }, {
    path: 'info',
    component: () => import('@/views/consciously/Info'),
    name: 'ApplyInfo',
    meta: { title: '报考信息', noCache: true }
  }, {
    path: 'manage',
    component: () => import('@/views/consciously/Manage'),
    name: 'Manage',
    meta: { title: '报考管理', noCache: true }
  }, {
    path: 'transcript',
    component: () => import('@/views/consciously/Transcript'),
    name: 'Transcript',
    meta: { title: '成绩单', noCache: true }
  }]
}

export default consciously
