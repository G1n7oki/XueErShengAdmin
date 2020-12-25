/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const feedback = {
  path: '/feedback',
  component: Layout,
  redirect: '/feedback',
  name: 'feedback',
  meta: {
    title: '帮助反馈',
    icon: 'guide'
  },
  children: [{
    path: 'help',
    component: () => import('@/views/feedback/Help'),
    name: 'Help',
    meta: { title: '帮助管理', noCache: true }
  }, {
    path: 'feedback',
    component: () => import('@/views/feedback/Feedback'),
    name: 'Feedback',
    meta: { title: '意见反馈', noCache: true }
  }]
}

export default feedback
