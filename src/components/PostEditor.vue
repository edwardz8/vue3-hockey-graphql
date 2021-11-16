<script>
export default {
  data() {
    return {
      text: "",
    };
  },
  methods: {
    save() {
      const post = {
        text: this.text
      };
      this.$emit('save', { post })

      this.text = ''
    },
  },
};
</script>

<template>
  <div class="container mx-auto">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea v-model="text" name="" id="" class="form-input" />
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit Post</button>
      </div>
    </form>
  </div>
</template>
