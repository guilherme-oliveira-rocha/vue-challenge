<template>
    <div class="card col-lg-5 mb-4 mx-4">
        <div class="card-body text-center">
            <h5 class="card-title">{{post.title}}</h5>
            <p class="card-text">{{post.excerpt}}</p>
            <router-link class="btn btn-primary ms-3" 
            :to="{ path: `${post.permalink}`}">Saiba Mais</router-link>
            
            <!-- <a :href="post.permalink" class="btn btn-primary">Saiba Mais</a> -->       
        </div>
    </div>
</template>

<script>
    export default {
        data() {
    return {
        filterArticle: this.$route.query.search,
        }
    },
        props: {
            post: {
                type: Object,
                required: true
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>