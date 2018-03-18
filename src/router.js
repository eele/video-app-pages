import Vue from 'vue'
import Router from 'vue-router'
import Discover from './pages/discover.vue'
import MyVideo from './pages/myvideo.vue'
import Mine from './pages/mine.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/discover',
      component: Discover
    },
    {
      path: '/myvideo',
      component: MyVideo
    },
    {
      path: '/mine',
      component: Mine
    }
  ]
})
