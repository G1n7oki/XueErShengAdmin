/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const topic = {
  path: '/topic',
  component: Layout,
  redirect: '/topic',
  name: 'TopicManage',
  meta: {
    title: '题库管理',
    icon: 'documentation'
  },
  children: [{
    path: 'topic',
    component: () => import('@/views/topic/Topic'),
    name: 'Topic',
    meta: { title: '题目管理', noCache: true }
  }]
}

export default topic
