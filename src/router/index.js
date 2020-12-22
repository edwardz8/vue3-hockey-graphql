import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PlayerDetails from "../components/PlayerDetails.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/player/:id",
    name: "PlayerDetails",
    props: (route) => {
      return {
        playerid: route.params.id
      };
    },
    component: PlayerDetails
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
