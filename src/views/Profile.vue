<script>
import PostList from "@/components/PostList";
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'
import { mapGetters } from "vuex";

export default {
  components: { PostList, UserProfileCard, UserProfileCardEditor },
  props: {
      edit: {
          type: Boolean,
          default: false
      }
  },
  computed: {
    ...mapGetters({ user: "authUser" })
  }
};
</script>

<template>
  <div class="container mx-auto">
    <div class="flex-grid">
     <div>
         <UserProfileCard v-if="!edit" :user="user" />
         <UserProfileCardEditor v-else :user="user" />

         <div class="profile-header">
             <span class="text-lead">{{ user.username }} recent activity</span>
             <a href="#">See only started threads?</a>
         </div>
     </div>
     <div>
         <PostList :posts="user.posts" />
     </div>
    </div>
  </div>
</template>
