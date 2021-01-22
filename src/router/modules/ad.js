/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ad = {
  path: '/ad',
  component: Layout,
  redirect: '/ad',
  name: 'AdManage',
  children: [{
    path: 'list',
    component: () => import('@/views/ad/Ad'),
    name: 'AdList',
    meta: { title: '广告管理', icon: 'star' }
  }]
}

export default ad
