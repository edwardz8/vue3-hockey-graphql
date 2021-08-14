<template>
  <div class="container-fluid">
    <div class="content">
      <h1>{{ post.title }}</h1>
      <img v-if="post.image" :src="imageUrlFor(post.image).width(440)" />
      <h6>Provided by: {{ post.name }}</h6>
      <SanityBlocks :blocks="blocks" />
    </div>
  </div>
</template>

<script>
import { SanityBlocks } from "sanity-blocks-vue-component";
import sanity from "../client";
import imageUrlBuilder from "@sanity/image-url";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const imageBuilder = imageUrlBuilder(sanity);

export default {
  name: "Post",
  components: { SanityBlocks },
  setup() {
    onMounted(() => {
      fetchPost();
    });
    const post = ref([]);
    let blocks = [];
    // let serializers = {};

    const {
      params: { slug },
    } = useRoute();

    const groqPostQuery = `*[slug.current == '${slug}'][0] {
        _id,
        title,
        slug,
        body, 
      "image": mainImage{
        asset->{
        _id,
        url
      }
      },
      "name":author->name,
      "authorImage":author->image
      }[0]
      `;

    function fetchPost() {
      sanity.fetch(groqPostQuery).then(
        post => {
          post.value = post;
          blocks = post.body;
        },
        (error) => {
          this.error = error;
        }
      );
    }

    const imageUrlFor = (source) => {
      return imageBuilder.image(source);
    };

    return {
      post,
      blocks,
      imageUrlFor,
      // serializers,
    };
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 42em;
}
.comments-section {
  display: flex;
  flex-direction: column;
}
textarea {
  margin-top: 1rem;
  margin-bottom: 2rem;
}
h1 {
  text-align: center;
}
h6 {
  color: #aaa;
  padding: 1em;
}
img {
  max-width: 100%;
}

hr {
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(66, 185, 131, 1),
    rgba(0, 0, 0, 0)
  );
  border: 0;
  height: 2px;
  margin: 40px auto;
}

blockquote {
  border-left: 4px solid #cccccc;
  font-size: 1.4em;
  font-style: italic;
  margin: 2rem 0;
  padding-left: 2rem;
  padding-right: 2rem;
}

.content h1 {
  font-size: 3em;
  margin: 1em 0;
}

@media (max-width: 1020px) {
  h1 {
    font-size: 3em;
  }

  .content h1 {
    font-size: 2.4em;
  }
}

@media (max-width: 480px) {
  body {
    font-size: 14px;
  }

  p,
  ul,
  ol {
    font-size: 1.2rem;
    margin: 1em 0;
  }
}
</style>
