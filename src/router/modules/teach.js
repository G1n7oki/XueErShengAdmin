/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const teachRouter = {
  path: '/teach',
  component: Layout,
  redirect: '/teach/teach-cell',
  name: 'Teach',
  meta: {
    title: '教学分类',
    icon: 'excel'
  },
  children: [{
    path: 'teach',
    component: () => import('@/views/teach/Teach'),
    name: '教学分类',
    meta: { title: '教学分类', noCache: true }
  }]
}

export default teachRouter
