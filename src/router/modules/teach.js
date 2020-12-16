/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const teachRouter = {
  path: '/teach',
  component: Layout,
  redirect: '/teach',
  name: 'Teaches',
  meta: {
    title: '教学分类',
    icon: 'education'
  },
  children: [{
    path: 'teach',
    component: () => import('@/views/teach/Teach'),
    name: 'Teach',
    meta: { title: '教学分类', noCache: true }
  }, {
    path: 'type',
    component: () => import('@/views/teach/Type'),
    name: 'Type',
    meta: { title: '课程班型', noCache: true }
  }, {
    path: 'level3',
    component: () => import('@/views/teach/Level3'),
    name: 'Level3',
    meta: { title: '三级学科管理', noCache: true },
    hidden: true
  }, {
    path: 'level4',
    component: () => import('@/views/teach/Level4'),
    name: 'Level4',
    meta: { title: '下属科目', noCache: true },
    hidden: true
  }]
}

export default teachRouter
