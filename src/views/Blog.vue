<template>
  <div class="articles">
    <h1>fungo betting and dfs boards</h1>
    <div class="posts">
      <!-- <div class="loading" v-if="loading">Loading...</div> -->
      <div class="container">
        <div class="content" v-if="posts">
          <div v-for="post in posts" class="post-item" :key="post._id">
            <router-link :to="{name: 'Post', params: { slug } }">
              <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img
                  class="w-full"
                  :src="imageUrlFor(post.image)"
                  alt="Sunset in the mountains"
                />
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">{{ post.title }}</div>
                  <p class="text-gray-700 text-base">
                    {{ post.excerpt }}
                  </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span
                    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >#mlbbetting</span
                  >
                  <span
                    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >#mlbdfs</span
                  >
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import sanity from "../client";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

export default {
  name: "Blog",
  setup() {
    onMounted(() => {
      fetchData();
    });

    const query = `*[ _type == 'post']{
        "player":player->name,
        _id,
        title,
        slug,
        excerpt,
        "image": mainImage{
        asset->{
        _id,
        url,
      }
    },
}[0...50]`;

    let posts = ref([]);
    let post = ref([])

    const imageUrlFor = (source) => {
      return imageBuilder.image(source);
    };

    function fetchData() {
      sanity.fetch(query).then(
        (postResults) => {
          posts.value = postResults;
        },
        (error) => {
          this.error = error;
        }
      );
    }

    return {
      posts,
      post,
      imageUrlFor,
    };
  },
};
</script>

<style scoped>
.articles h1 {
  text-align: center;
}
.container {
  margin: 0 auto;
  max-width: 80em;
  width: 100%;
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.post-item {
  box-sizing: border-box;
  margin: 1rem;
}
</style>
