import Vue from 'vue'
import router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import Search from '@/components/Search'
import Space from '@/components/Space'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'

Vue.use(router)

export default new router({
  routes: [
    {
      path: '/',
      component: LandingPage
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/spaces/:name',
      component: Space
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/signup',
      component: SignUp
    }
  ]
})
