import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import PlayerDetails from "../components/PlayerDetails.vue"
import Table from '../views/Table.vue'
import Blog from '@/views/Blog.vue'
import NotFound from '../views/NotFound.vue'
import Post from '@/views/Post.vue'
import Contact from '@/views/Contact.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/player/:id",
    name: "PlayerDetails",
    props: (route) => {
      const id = Number.parseInt(route.params.id)
      if (Number.isNaN(id)) {
        return 0
      }
      return {
        id
      };
    },
    component: PlayerDetails
  },
  {
    path: '/articles',
    component: Blog,
    meta: {
      title: 'Posts'
    }
  },
  {
    path: "/blog/:slug",
    component: Post,
    name: "Post",
    //props: route => ({ id: route.params.id })
  },
  {
    path: '/table',
    name: 'Table',
    component: Table
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/:path(.*)',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router