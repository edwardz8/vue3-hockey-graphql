<!-- <script>
import ForumList from './ForumList.vue'
import { findById } from '@/helpers'

export default {
    components: { ForumList },
    props: {
        id: {
            required: true,
            type: String
        }
    },
    computed: {
        category () {
            return findById(this.$store.state.sourceData.categories, this.id)
            // return this.$store.state.categories.find(category => category.id === this.id)
        }
    },
    methods: {
        getForumsForCategory (category) {
            return this.$store.state.sourceData.forums.filter(forum => forum.categoryid === category.id)
        }
    }
}
</script>

<template>
    <h2>{{ category.name }}</h2>
    <ForumList :title="category.name" :forums="getForumsForCategory(category)" />
</template> -->