/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const article = {
  path: '/article',
  component: Layout,
  redirect: '/article',
  name: 'ArticleManage',
  meta: {
    title: '文章管理',
    icon: 'documentation'
  },
  children: [{
    path: 'article',
    component: () => import('@/views/article/Article'),
    name: 'Article',
    meta: { title: '文章管理', noCache: true }
  }]
}

export default article
