import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index'
import Login from '@/view/Login'
import User from '@/view/User'
import Register from '@/view/Register'
import Detail from '@/view/Detail'

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
    }
  ]
})
