/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const cooperation = {
  path: '/cooperation',
  component: Layout,
  redirect: '/cooperation/list',
  name: 'Cooperation',
  meta: { title: '合作院校', icon: 'link' },
  children: [{
    path: 'list',
    component: () => import('@/views/cooperation/List'),
    name: 'List',
    meta: { title: '合作院校', noCache: true }
  }, {
    path: 'level',
    component: () => import('@/views/cooperation/Level'),
    name: 'Level',
    meta: { title: '报考专业', noCache: true },
    hidden: true
  }, {
    path: 'manage',
    component: () => import('@/views/cooperation/Manage'),
    name: 'P_Manage',
    meta: { title: '地区管理', noCache: true },
    hidden: true
  }]
}

export default cooperation
