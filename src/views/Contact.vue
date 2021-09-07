<template>
<div class="contact">
<Features />
</div>
</template>

<script>
import Features from '@/components/Features.vue'

export default {
    name: 'Contact',
    components: { Features }
}
</script>

<style>
.contact {
    /* background-color: rgb(238, 238, 238); */
    border-radius: 20px;
    margin-left: 2rem;
    margin-right: 2rem;
}
</style>