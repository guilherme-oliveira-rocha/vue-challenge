<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
          <a class="navbar-brand" href="#!">Article</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
                  <li class="nav-item"><a class="nav-link" href="#!">About</a></li>
                  <li class="nav-item"><a class="nav-link" href="#!">Contact</a></li>
                  <li class="nav-item"><a class="nav-link" href="#">Blog</a></li>
              </ul>
          </div>
      </div>
  </nav>
  <div class="col-lg-12 d-flex align-items-center justify-content-center mt-5">
    <form class="col-lg-5" action="" @submit.prevent="getSearch">
      <div class="mb-3">
        <label for="formGroupExampleInput" class="form-label mb-3">Digite o nome de um artigo</label>
        <div class="d-flex">
          <input type="search" name="search" class="form-control" placeholder="Busque um artigo">
          <button class="p-2 btn btn-primary ms-3">Buscar</button>
          <button class="col-lg-4 p-2 btn btn-primary ms-3" @click="getOrderBy">Mais Relevantes</button>
        </div>
      </div>
    </form>
  </div>
  <div class="container d-flex flex-column align-items-center mt-5">
    <paginate v-show="filterArticle !== undefined && filterArticle !== '' && posts.length" 
      :page-count="page"
      :page-range="3"
      :margin-pages="1"
      :click-handler="getPage"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      >
    </paginate>
    <p v-show="posts.length > 0 && filterArticle !== undefined && filterArticle !== ''">Artigos encontrados: {{articleLength}}</p>
    <p v-show="posts.length == 0 && filterArticle !== undefined">Não existem artigos relacionados ao termo pesquisado!</p>
    <div class="d-flex flex-wrap align-items-start mt-5">
      <PostListaItem v-for="(post, index) in posts" :key="index" :post="post"></PostListaItem>
    </div>
  </div>
</template>

<script>
import {wpApi} from '../api/wpApi';
import PostListaItem from './postListaItem.vue';
import Paginate from 'vuejs-paginate-next';


export default {
  components: {
    PostListaItem,
    paginate: Paginate,
  },
  data() {
    return {
      filterArticle: undefined,
      posts:[],
      articleLength: 0,
      page: 0,
    }
  },
  methods: {
    async getSearch(event) {
      event.preventDefault()
      this.filterArticle = event.target.elements.search.value
      const api = await fetch(`${wpApi}posts?search="${event.target.elements.search.value}"`)
      const apiArtigos = await api.json()
      this.posts = apiArtigos.data
      this.articleLength = apiArtigos.size
      this.posts.filter((post)=>{
          return post.title.toLowerCase().includes(event.target.elements.search.value.toLowerCase())
        })
        // console.log(apiArtigos)
      this.page = apiArtigos.pages
    },
    async getOrderBy(event) {
      event.preventDefault()
      const api = await fetch(`${wpApi}posts?search="${this.filterArticle}&orderby=relevance`)
      const apiArtigos = await api.json()
      this.posts = apiArtigos.data
      this.articleLength = apiArtigos.size
    },
    async getPage(event) {
      const api = await fetch(`${wpApi}posts?search="${this.filterArticle}"&page=${event}`)
      const apiArtigos = await api.json()
      this.posts = apiArtigos.data
    },
  },
  async created() {
    const api = await fetch(`${wpApi}posts`)
    const apiArtigos = await api.json()
    this.posts = apiArtigos.data
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
