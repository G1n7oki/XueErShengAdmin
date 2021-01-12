/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const live = {
  path: '/live',
  component: Layout,
  redirect: '/live',
  name: 'Live',
  meta: {
    title: '直播管理',
    icon: 'chart'
  },
  children: [{
    path: 'live-package',
    component: () => import('@/views/live/LivePackage'),
    name: 'LivePackage',
    meta: { title: '直播课包', noCache: true }
  }, {
    path: 'create-live-package',
    component: () => import('@/views/live/CreateLivePackage'),
    name: 'CreateLivePackage',
    meta: { title: '直播课包信息', noCache: true },
    hidden: true
  }, {
    path: 'live-list',
    component: () => import('@/views/live/LiveList'),
    name: 'LiveList',
    meta: { title: '直播课列表', noCache: true }
  }, {
    path: 'create-live',
    component: () => import('@/views/live/CreateLive'),
    name: 'CreateLive',
    meta: { title: '直播课信息', noCache: true },
    hidden: true
  }]
}

export default live
