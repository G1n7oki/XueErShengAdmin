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
    meta: { title: '文章列表', noCache: true }
  }, {
    path: 'create-article',
    component: () => import('@/views/article/CreateArticle'),
    name: 'CreateArticle',
    meta: { title: '添加文章', noCache: true },
    hidden: true
  }]
}

export default article
