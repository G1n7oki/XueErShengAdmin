/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ad = {
  path: '/ad',
  component: Layout,
  redirect: '/ad',
  name: 'AdManage',
  meta: { title: '广告管理', icon: 'star' },
  children: [{
    path: 'list',
    component: () => import('@/views/ad/Ad'),
    name: 'AdList',
    meta: { title: '广告列表', noCache: true }
  }, {
    path: 'info',
    component: () => import('@/views/ad/Info'),
    name: 'AdInfo',
    meta: { title: '广告信息', noCache: true }
  }]
}

export default ad
