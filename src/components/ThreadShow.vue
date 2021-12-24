<script>
import PostList from "./PostList.vue";
import PostEditor from "./PostEditor.vue";
// import { findById } from '@/helpers'

export default {
  name: "ThreadShow",
  components: { PostList, PostEditor },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  computed: {
    threads() {
      return this.$store.state.threads;
    },
    posts() {
      return this.$store.state.posts;
    },
    thread() {
      return this.$store.getters.thread(this.id);
      // return findById(this.threads, this.id)
      // return this.threads.find(thread => thread.id === this.id)
      // also available under this.$route.params.id
    },
    threadPosts() {
      return this.posts.filter(post => post.threadId === this.id)
    },
  },
  methods: {
    addPost(eventData) {
      const post = {
        ...eventData.post,
        threadId: this.id,
      };
      this.$store.dispatch("createPost", post);
      // this.posts.push(post)
      // this.thread.posts.push(post.id)
    },
  },
};
</script>

<template>
  <div class="container mx-auto">
    <h4>
      {{ thread.title }}
      <router-link :to="{ name: 'ThreadEdit', id: this.id }">Edit Thread</router-link>

      <p>
        By <a href="#" class="link-unstyled">{{ thread.author.name }}</a
        >, <AppDate :timestamp="thread.publishedAt" />.
        <span
          style="float: right; margin-top: 2px"
          class="hide-mobile text-faded text-small"
          >{{ thread.repliesCount }} replies by
          {{ thread.contributorsCount }} contributors</span
        >
      </p>
    </h4>

    <post-list :posts="threadPosts" />

    <post-editor @save="addPost" />

    <div></div>
  </div>
</template>

<style></style>
