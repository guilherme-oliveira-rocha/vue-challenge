<template>
    <section>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <router-link class="navbar-brand" :to="{ path: '/'}">Article</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="#!">About</a></li>
                        <li class="nav-item"><a class="nav-link" href="#!">Contact</a></li>
                        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Blog</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container mt-5">
            <div class="row">
                <div class="col-lg-8 text-start">
                    <article>
                        <!-- Post header-->
                            <h1 class="fw-bolder mb-1">{{postSingle.title}}</h1>
                            <div class="text-muted fst-italic mt-3 mb-2">Posted on {{postSingle.published}} by <a :href="author.link">{{author.name}}</a></div>
                            <div class="text-muted fst-italic mb-2">Last Update on {{postSingle.modified}}</div>
                            <p v-for="(cat, index) in postSingle.categories" :key="index" class="badge bg-secondary text-decoration-none link-light mt-3" href="#!">{{cat.name}}</p>
                        <!-- Preview image figure-->
                        <figure class="mb-4"><img v-if="img !== null" class="img-single rounded" :src="img.large" :alt="postSingle.title" /></figure>
                        <div class="img fs-6 mb-5" v-html="postSingle.content"></div>
                    </article>
                    <section class="mb-5">
                        <div class="card bg-light">
                            <div class="card-body">
                                <form class="mb-4"><textarea class="form-control" rows="3" placeholder="Join the discussion and leave a comment!"></textarea></form>
                                <div class="d-flex mb-4">
                                    <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                    <div class="ms-3">
                                        <div class="fw-bold">Commenter Name</div>
                                        If you're going to lead a space frontier, it has to be government; it'll never be private enterprise. Because the space frontier is dangerous, and it's expensive, and it has unquantified risks.
                                        <div class="d-flex mt-4">
                                            <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                            <div class="ms-3">
                                                <div class="fw-bold">Commenter Name</div>
                                                And under those conditions, you cannot establish a capital-market evaluation of that enterprise. You can't get investors.
                                            </div>
                                        </div>
                                        <div class="d-flex mt-4">
                                            <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                            <div class="ms-3">
                                                <div class="fw-bold">Commenter Name</div>
                                                When you put money directly to a problem, it makes a good headline.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="flex-shrink-0"><img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                    <div class="ms-3">
                                        <div class="fw-bold">Commenter Name</div>
                                        When I look at the universe and all the ways the universe wants to kill us, I find it hard to reconcile that with statements of beneficence.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-header">Previous Posts</div>
                        <div class="card-body d-flex flex-row-reverse align-items-center justify-content-center" v-for="(post, index) in postSingle.previous_posts" :key="index">
                            <a class="card-title fs-5 ms-3" :href="post.permalink">{{post.title}}</a>
                            <figure v-if="post.featured_media !== null">
                                <img class="rounded" :src="post.featured_media.thumbnail" :alt="post.title" />
                            </figure>
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">Next Posts</div>
                        <div class="card-body d-flex flex-row-reverse align-items-center justify-content-center" v-for="(post, index) in postSingle.next_posts" :key="index">
                            <a class="card-title fs-5 ms-3" :href="post.permalink">{{post.title}}</a>
                            <figure v-if="post.featured_media !== null">
                                <img class="rounded" :src="post.featured_media.thumbnail" :alt="post.title" />
                            </figure>
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">Exerpt</div>
                        <div class="card-body">{{postSingle.excerpt}}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {wpApi} from '../api/wpApi';

export default {
    head() {
        return {
            title: this.postSingle.title,
            meta: [
                {property: 'og:title', content: this.postSingle.metas["og:title"]},
                {property: 'og:site_name', content: this.postSingle.metas["og:site_name"]},
                {property: 'og:type', content: this.postSingle.metas["og:type"]},
                // {property: 'og:url', content: 'https://www.my-site.com/my-special-page'},
                {property: 'og:image', content: this.postSingle.metas["og:image"]},
                {property: 'og:description', content: this.postSingle.metas["og:description"]},
                {name: 'twitter:card', content: this.postSingle.metas["twitter:card"]},
                {name: 'twitter:site', content: this.postSingle.metas["twitter:site"]},
                {name: 'twitter:creator', content: this.postSingle.metas["twitter:creator"]},
            ],
            link: [
                {rel: 'canonical', href: this.postSingle.metas.canonical}
            ]
        }
    },
    data() {
        return {
            id: this.$route.params.id,
            postSingle: [],
            author: {},
            img: {},
            }
        },
    async created() {
        const api = await fetch(`${wpApi}posts/${this.id}`)
        const apiArtigos = await api.json()
        this.postSingle = apiArtigos
        this.author = apiArtigos.author
        this.img = apiArtigos.featured_media

        apiArtigos.modified = new Date()
        var options = {year: 'numeric', month: 'long', day: 'numeric'};
        this.postSingle.modified = apiArtigos.modified.toLocaleDateString("en-US", options)
        
        apiArtigos.published = new Date()
        this.postSingle.published = apiArtigos.published.toLocaleDateString("en-US", options)
    },
    }
</script>

<style lang="css">
    .img figure img{
        width: 100%;
        height: auto;
        border-radius: .25rem!important;
    }
    .img-single{
        width: 100%;
        height: auto;
        border-radius: .25rem!important;
    }
    .card-title {
        text-decoration: none;
        color: #000;
    }
</style>