import { createRouter, createWebHistory } from 'vue-router'
import singlePosts from './components/singlePost.vue'
import postsList from './components/postsList.vue';

const routes = [
    {path: '/:id', 
        component:  singlePosts,
        name: 'single',
        // props: extrairParametroId
    },
    {path: '/', component: postsList, name: 'postsList'},
];

const router = createRouter({
	history: createWebHistory(),
	linkActiveClass: 'active',
	routes
})

export default router