import { createStore } from 'vuex'
import sourceData from '@/data'
import { findById } from '@/helpers'
// import { upsert } from '@/helpers'

/* never update state outside a mutation
   mutations are fired within actions
*/

export default createStore({
  state: {
    sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser: (state, getters) => {
      const user = findById(state.sourceData.users, state.authId)
      // const user = state.sourceData.users.find(user => user.id === state.authId)
      if (!user) return null 
      return {
        user,
        get posts () {
          return state.sourceData.posts.filter(post => post.userId === user.id)
        },
        get postsCount () {
          return this.posts.length
        },
        get threads () {
          return state.sourceData.threads.filter(post => post.userId === user.id)
        },
        get threadsCount () {
          return this.threads.length 
        }
      }
    },
    thread: state => {
      return (id) => {
        const thread = findById(state.sourceData.threads, id)
        return {
          thread, // ...thread breaks
          get author () {
            return findById(state.sourceData.users, thread.userId)
          },
          get repliesCount () {
            return this.thread.posts.length - 1
            // return thread.posts.length - 1 -- may work. def will if ...thread
          },
          get contributorsCount () {
            return this.thread.contributors.length 
            // return thread.contributors.length 
          }
        }
      }
    }
  },
  mutations: {
    setUser (state, { user, userId }) {
      const userIndex = state.sourceData.users.findIndex(user => user.id === userId)
      state.sourceData.users[userIndex] = user
    },
    setPost (state, { post }) {
      // upsert(state.posts, post)
      const index = state.sourceData.posts.findIndex(p => p.id === post.id)
      if (post.id && index !== -1) {
        state.sourceData.posts[index] = post
      } else {
        state.sourceData.posts.push(post)
      }
    },
    setThread (state, { thread }) {
      // upsert(state.threads, thread)
      const index = state.sourceData.threads.findIndex(t => t.id === thread.id)
      if (thread.id && index !== -1) {
        state.sourceData.threads[index] = thread 
      } else {
        state.sourceData.threads.push(thread)
      }
    },
    appendPostToThread (state, { postId, threadId }) {
      const thread = findById(state.sourceData.threads, threadId)
      // const thread = state.sourceData.threads.find(thread => thread.id === threadId)
      thread.posts = thread.posts || []
      thread.posts.push(postId)
    },
    appendThreadToForum (state, { forumId, threadId }) {
      const forum = findById(state.sourceData.forums, forumId)
      // const forum = state.sourceData.forums.find(forum => forum.id === forumId)
      forum.threads = forum.threads || []
      forum.threads.push(threadId)
    },
    appendThreadToUser (state, { userId, threadId }) {
      const user = findById(state.sourceData.users, userId)
      // const user = state.sourceData.users.find(user => user.id === userId)
      user.threads = user.threads || []
      user.threads.push(threadId)
    }
    /* 
    appendPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),
    appendThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),
    appendThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' })
    appendContributorToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' })
    */
  },
  actions: {
    createPost ({ commit, state }, post) {
      post.id = 'ggqq' + Math.random()
      post.userId = state.authId
      post.publishedAt = Math.floor(Date.now() / 1000)

      commit('setPost', { post })
      // commit('appendPostToThread', { childId: post.id, parentId: post.threadId })
      commit('appendPostToThread', { postId: post.id, threadId: post.threadId })
      // commit('appendContributorToThread', { childId: state.authId, parentId: post.threadId })
    },
    async createThread ({commit, state, dispatch}, { title, text, forumId } ) {
      const id = 'ggqq' + Math.random()
      const userId = state.sourceData.userId 
      const publishedAt = Math.floor(Date.now() / 1000)
      const thread = { forumId, title, text, publishedAt, userId, id }
      
      commit('setThread', { thread })
      commit('appendThreadToUser', { userId, threadId: id })
      commit('appendThreadToForum', { forumId, theadId: id })
      /* 
       commit('appendThreadToUser', { parentId: userId, childId: id })
       commit('appendThreadToForum', { parentId: forumId, childId: id })
      */
      dispatch('createPost', { text, theadId: id })
      return findById(state.sourceData.threads, id)
      // return state.sourceData.threads.find(thread => thread.id === id)
    },
    async updateThread ({ commit, state }, { title, text, id }) {
      const thread = findById(state.sourceData.threads, id)
      // const thread = state.sourceData.threads.find(thread => thread.id === id)
      const post = findById(state.sourceData.posts, thread.posts[0])
      // const post = state.sourceData.posts.find(post => post.id === thread.posts[0])

      const newThread = { thread, title } // ...thread polymer error. same with ...post on next line
      const newPost = { post, text }
      commit('setThread', { thread: newThread })
      commit('setPost', { post: newPost })
      return newThread 
    },
    updateUser ({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    }
  },
  modules: {}
})

function makeAppendChildToParentMutation ({ parent, child }) {
  return (state, { childId, parentId }) => {
    const resource = findById(state[parent], parentId)
    resource[child] = resource[child] || []

    const test = resource.posts || []

    if (!resource[child].includes(childId)) {
      resource[child].push(childId)
    }
  }
}