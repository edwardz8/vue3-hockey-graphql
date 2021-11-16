<script>
import ThreadList from '@/components/ThreadList.vue'
import { findById } from '@/helpers'

export default {
  // child component for single forum post 
  name: "Forum",
  components: { ThreadList },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    forum () {
      return findById(this.$store.state.forums, this.id)
      // return this.$store.state.forums.find(forum => forum.id === this.id)
    },
    thread() {
      return this.$store.state.threads.find(thread => thread.forumId === this.id)
    }
  },
};
</script>

<template>
  <div class="container mx-auto">
    <div class="push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }" class="btn-green btn-small">Start a thread</router-link>
    </div>
    </div>

    <!-- {{ threads }} -->
    <!-- <div v-for="thread in threads" :key="thread.id"> -->
      <div class="push-top">
      <ThreadList :threads="threads" />
      </div>
    <!-- </div> -->
  </div>
</template>

<style></style>
