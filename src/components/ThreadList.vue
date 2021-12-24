<script>
import AppDate from './AppDate.vue'
import { findById } from '@/helpers'

export default {
  name: "ThreadList",
  props: {
    threads: {
      type: Array,
      required: true
    }
  },
  components: {
    AppDate
  },
  computed: {
    posts () {
      return this.$store.state.posts 
    },
    users () {
      return this.$store.state.users 
    }
  },
  methods: {
    postById (postId) {
      return findById(this.posts, postId)
      // return this.posts.find(p => p.id === postId)
    },
    userById (userId) {
      return findById(this.users, userId)
      // return this.users.find(p => p.id === userId)
    }
  }
};
</script>

<template>
  <div class="col-full">

    <div class="thread-list">

      <h2 class="list-title">Threads</h2>

      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
           <!--  <router-link :href="`/thread/${thread.id}`">{{ thread.title }}</router-link> -->
            <router-link :to="{name: 'ThreadShow', params: {id: thread.id}}">{{ thread.title }}</router-link>
          </p>
          <p class="text-faded text-xsmall">
            By <a href="#">{{ userById(thread.userId).name }}</a>,
            <AppDate :timestamp="thread.publishedAt" />
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">
           {{ thread.repliesCount }} replies
           <!-- {{ (thread.posts.length > 1 || thread.posts.length === 0) ? "replies" : "reply" }} -->
          </p>

          <img class="avatar-medium" :src="userById(thread.userId).avatar" alt="">

          <div>
            <p class="text-xsmall">
              <AppDate :timestamp="thread.publishedAt" />
            </p>
            <p class="text-xsmall text-faded">{{ thread.publishedAt }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style></style>