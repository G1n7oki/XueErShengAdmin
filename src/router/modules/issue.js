/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const issue = {
  path: '/issue',
  component: Layout,
  redirect: '/issue',
  name: 'Issue',
  meta: {
    title: '问答管理',
    icon: 'message'
  },
  children: [{
    path: 'question',
    component: () => import('@/views/issue/Question'),
    name: 'Question',
    meta: { title: '提问管理', noCache: true }
  }, {
    path: 'answer',
    component: () => import('@/views/issue/Answer'),
    name: 'Answer',
    meta: { title: '回答管理', noCache: true }
  }]
}

export default issue
