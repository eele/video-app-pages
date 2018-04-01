import Vue from 'vue'
import Router from 'vue-router'
import Discover from './pages/discover.vue'
import Comment from './pages/comment.vue'
import UserVideos from './pages/uservideos.vue'
import MyVideos from './pages/myvideos.vue'
import Subscribe from './pages/subscribe.vue'
import MyFavorites from './pages/myfavorites.vue'
import MyHistory from './pages/myhistory.vue'
import Mine from './pages/mine.vue'
import SearchedVideos from './pages/searchedVideos.vue'
import SearchedUsers from './pages/searchedUsers.vue'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/discover',
      component: Discover
    },
    {
      path: '/comment',
      component: Comment
    },
    {
      path: '/uservideos',
      component: UserVideos
    },
    {
      path: '/myvideos',
      component: MyVideos
    },
    {
      path: '/subscribe',
      component: Subscribe
    },
    {
      path: '/myfavorites',
      component: MyFavorites
    },
    {
      path: '/myhistory',
      component: MyHistory
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/searchedVideos',
      component: SearchedVideos
    },
    {
      path: '/searchedUsers',
      component: SearchedUsers
    }
  ]
})
