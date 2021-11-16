<script>
import ThreadEditor from '@/components/ThreadEditor'
import { findById } from '@/helpers'

export default {
    components: { ThreadEditor },
    props: {
        forumId: {
            type: String,
            required: true
        }
    },
    computed: {
        forum () {
            return findById(this.$store.state.forums, this.forumId)
            // return this.$store.state.forums.find(forum => forum.id === this.forumId)
        }
    },
    methods: {
        async save ({ title, text }) {
            const thread = await this.$store.dispatch('createThread', {
                forumId: this.forum.id,
                title,
                text
            })
            this.$router.push({ name: 'ThreadShow', params: { id: thread.id } })
        },
        cancel () {
            this.$router.push({ name: 'Forum', params: { id: this.forum.id } })
        }
    }
}
</script>

<template>
    <div class="container mx-auto">
        <h1>
            Create a new thread in <i>{{ forum.name }}</i>
        </h1>

        <ThreadEditor @save="save" @cancel="cancel" />
    </div>
</template>