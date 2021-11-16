<script>
import ThreadEditor from "@/components/ThreadEditor";
import { findById } from "@/helpers";

export default {
  components: {
    ThreadEditor,
  },
  props: {
    id: { type: String, required: true },
  },
  computed: {
    thread() {
      return findById(this.$store.state.sourceData.threads, this.id);
      // return this.$store.state.sourceData.threads.find((thread) => thread.id === this.id);
    },
    text() {
      return findById(this.$store.state.sourceData.posts, this.thread.posts[0]).text
      /* this.$store.state.sourceData.posts.find(
        (post) => post.id === this.thread.posts[0]
      ).text; */
    },
  },
  methods: {
    async save({ title, text }) {
      const thread = await this.$store.dispatch("createThread", {
        id: this.forum.id,
        title,
        text,
      });
      this.$router.push({ name: "ThreadShow", params: { id: thread.id } });
    },
    cancel() {
      this.$router.push({ name: "ThreadShow", params: { id: this.id } });
    },
  },
};
</script>

<template>
  <div class="container mx-auto">
    <h2>
      Editing <i>{{ thread.title }}</i>
    </h2>

    <ThreadEditor :title="thread.title" :text="text" @save="save" @cancel="cancel" />
  </div>
</template>
