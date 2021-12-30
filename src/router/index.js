import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import PitcherDetails from "../components/PitcherDetails.vue"
import Table from '@/views/Table.vue'
import Blog from '@/views/Blog.vue'
import NotFound from '@/views/NotFound.vue'
import Post from '@/views/Post.vue'
import Contact from '@/views/Contact.vue'
import ForumMain from '@/views/ForumMain.vue'
// import ForumHome from '@/views/ForumHome.vue'
import ThreadShow from '@/components/ThreadShow.vue'
import ThreadCreate from '@/views/ThreadCreate'
import ThreadEdit from '@/views/ThreadEdit'
import Forum from '@/components/Forum.vue'
import Category from '@/views/Category.vue'
import Profile from '@/views/Profile.vue'
import sourceData from '@/data.json'
import { findById } from '@/helpers'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/pitcher/:id",
    name: "PitcherDetails",
    props: (route) => {
      const id = Number.parseInt(route.params.id)
      if (Number.isNaN(id)) {
        return 0
      }
      return {
        id
      };
    },
    component: PitcherDetails
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
  /* {
    path: '/home-forum',
    name: 'ForumHome',
    component: ForumHome
  }, */
  {
    path: '/forum',
    name: 'ForumMain',
    component: ForumMain
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    meta: {
      toTop: true,
      smoothScroll: true
    }
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: {
      edit: true
    }
  },
  {
    path: '/form/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    beforeEnter(to, from, next) {
      // check if thread exists. continue if so
      // redirect to 'not found' if not
      const threadExists = findById(sourceData.threads, to.params.id)
      // const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
      if (threadExists) {
        return next()
      } else {
        next
          ({
            name: 'NotFound',
            params: {
              pathMatch: to.path.split('/')
            },
            query: to.query,
            hash: to.hash
          })
      }
    }
    // props: route => ({ id: route.params.id })
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.scrollBehavior = 'smooth'
    return scroll
  }
})

export default router