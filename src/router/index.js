import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'
import Login from '@/view/Login'
import User from '@/view/User'
import Register from '@/view/Register'
import Detail from '@/view/Detail'
import GoodDetail from '@/view/GoodDetail'
import Hotgoods from '@/view/Hotgoods'
import CommentDetail from '@/view/CommentDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/goodDetail',
      name: 'GoodDetail',
      component: GoodDetail
    },
    {
      path: '/hotgoods',
      name: 'Hotgoods',
      component: Hotgoods
    },
    {
      path: '/commentDetail',
      name: 'CommentDetail',
      component: CommentDetail
    },
  ]
})
