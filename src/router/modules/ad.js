/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const ad = {
  path: '/user',
  component: Layout,
  redirect: '/user',
  name: 'User',
  meta: {
    title: '广告管理',
    icon: 'peoples'
  }
}

export default ad
