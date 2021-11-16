<script>
import AppDate from './AppDate.vue'
import { findById } from '@/helpers'

export default {
    props: {
        posts: {
            required: true,
            type: Array
        }
    },
    components: {
      AppDate
    },
    computed: {
      users () { return this.$store.state.users }
    },
    methods: {
        userById (userId) {
          return findById(this.users, userId)
            // return this.users.find(p => p.id === userId)
        }
    }
}

</script>


<template>
  <div class="post-list">
    <div class="post"
         v-for="post in posts"
         :key="post.id"
    >

      <div class="user-info">
        <a href="#" class="user-name">{{userById(post.userId).name}}</a>

        <a href="#">
          <img class="avatar-large" :src="userById(post.userId).avatar" alt="">
        </a>

        <p class="desktop-only text-small">107 posts</p>

      </div>

      <div class="post-content">
        <div>
          <p>
            {{post.text}}
          </p>
        </div>
      </div>

      <div class="post-date text-faded">
        <AppDate :timestamp="post.publishedAt" />
        <!-- {{ diffForHumans(post.publishedAt) }} -->
        <!-- {{post.publishedAt}} -->
      </div>

    </div>

  </div>
</template>