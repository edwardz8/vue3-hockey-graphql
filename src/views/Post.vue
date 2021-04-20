<template>
  <div class="container-fluid">
    <div class="content">
      <h1>{{ post.title }}</h1>
      <img v-if="post.image" :src="imageUrlFor(post.image).width(440)" />
      <h6>By: {{ post.name }}</h6>
      <h6>{{ post.player }}</h6>
      <SanityBlocks :blocks="blocks" />

      <form name="rating" method="POST">
        <input type="hidden" name="form-name" value="rating" />
        <input type="hidden" name="album" v-model="post._id" />
        <div class="my-7">
          <div class="font-medium text-xl">
            Rating: <span class="text-red-700">*</span>
          </div>
          <label for="1star" class="font-medium"
            >1<input
              class="ml-2 mr-6"
              type="radio"
              name="stars"
              value="1"
              id="1star"
              required
          /></label>
          <label for="2stars" class="font-medium"
            >2<input
              class="ml-2 mr-6"
              type="radio"
              name="stars"
              value="2"
              id="2stars"
              required
          /></label>
          <label for="3stars" class="font-medium"
            >3<input
              class="ml-2 mr-6"
              type="radio"
              name="stars"
              value="3"
              id="3stars"
              required
          /></label>
          <label for="4stars" class="font-medium"
            >4<input
              class="ml-2 mr-6"
              type="radio"
              name="stars"
              value="4"
              id="4stars"
              required
          /></label>
          <label for="5stars" class="font-medium"
            >5<input
              class="ml-2 mr-6"
              type="radio"
              name="stars"
              value="5"
              id="5stars"
              required
          /></label>
        </div>

        <div class="comments-section">
          <div class="content">
            <label class="font-medium text-xl"
              >Comments:
              <textarea
                class="block border-2 border-green-300"
                name="comment"
                cols="40"
                rows="3"
              />
            </label>
          </div>
          <div>
            <button class="bg-green-300 px-3 text-lg font-bold" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>

    <div v-if="post.ratings" class="lg:clear-right">
      <div class="text-2xl font-bold">Ratings:</div>
      <ul class="inline-block">
        <li class="mt-2" v-for="rating in post.ratings" :key="post.ratings._id">
          <span class="w-24 inline-block mr-4">
            <span v-for="star in rating.stars" :key="star" class="text-red-700 text-xl"
              >&starf;</span
            >
          </span>
          <span class="text-gray-700"
            ><em>"{{ rating.comment }}"</em></span
          >
        </li>
      </ul>
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
  setup(props) {
    onMounted(() => {
      fetchPost();
    });
    let post = ref([]);
    let blocks = ref([]);

    const {
      params: { id },
    } = useRoute();

    const groqPostQuery = `*[ _type=='post' && slug.current == $slug] {
        _id,
        title,
        text,
        slug,
        body, 
      "player":player->name,
      "image": mainImage{
        asset->{
        _id,
        url
      }
      },
      "ratings": *[ _type == "rating" && references(^._id) ]{ stars, comment, _id}
      "name":author->name,
      "authorImage":author->image
      }[0]
      `;

    function fetchPost() {
      sanity.fetch(groqPostQuery, { slug: route.params.slug }).then(
        (post) => {
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
