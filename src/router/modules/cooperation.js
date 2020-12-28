/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const cooperation = {
  path: '/cooperation',
  component: Layout,
  redirect: '/cooperation/list',
  name: 'Cooperation',
  children: [{
    path: 'list',
    component: () => import('@/views/cooperation/List'),
    name: 'List',
    meta: { title: '合作院校', icon: 'link', noCache: true }
  }]
}

export default cooperation
