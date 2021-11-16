<script>
export default {
  props: {
    title: { type: String, default: "" },
    text: { type: String, default: "" },
  },
  data() {
    return {
      form: {
        title: this.title,
        text: this.text,
      },
    };
  },
  methods: {
    save() {
      this.$emit("save", { ...this.form });
    },
  },
  computed: {
      existing () {
          return !!this.title 
      }
  }
};
</script>

<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title</label>
      <input
        v-model="form.title"
        type="text"
        id="thread_title"
        class="forum-input"
        name="title"
      />
    </div>
    <div class="form-group">
      <label for="thread_content">Content</label>
      <textarea
        v-model="form.text"
        type="text"
        id="thread_content"
        class="forum-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>
    <div class="btn-group">
      <button @click.prevent="$emit('cancel')">Cancel</button>
      <button type="submit" name="Publish">{{ existing ? 'Update' : 'Publish' }}</button>
    </div>
  </form>
</template>
