<script>
export default {
  props: {
      user: {
          type: Object,
          required: true,
      }
  },
  /* following 4 methods not needed? */
  /* computed: {
    userPostsCount() {
      return this.userPosts.length;
    },
    userPosts() {
      return Object.values(this.$store.state.posts).filter(
        (post) => post.userId === this.user.id
      );
    },
    userThreadsCount() {
      return this.userThreads.length;
    },
    userThreads() {
      return Object.values(this.$store.state.threads).filter(
        (post) => post.userId === this.user.id
      );
    },
  }, */
};
</script>

<template>
  <div class="profile-card">
    <p class="text-center">
      <img :src="user.avatar" class="avatar-xlarge" />
    </p>
    <p class="title">{{ user.username }}</p>
    <p class="title">{{ user.name }}</p>

    <p class="text-justify">{{ user.bio || "No bio specified." }}</p>

    <span class="online">{{ user.username }} is online</span>

    <div class="stats">
      <span>{{ userPostsCount }} posts</span>
      <span>{{ userThreadsCount }} threads</span>
    </div>

    <p v-if="user.website" class="text-large text-center">
      <i class="fa fa-globe"></i>
      <a :href="user.website">{{ user.website }}</a>
    </p>

    <div class="text-center">
        <router-link :to="{name: 'ProfileEdit'}" class=""></router-link>
    </div>
  </div>
</template>
