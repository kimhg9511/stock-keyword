import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import('../views/Home.vue')
  // },
  {
    path: '/card',
    name: 'Card',
    component: () => import('../components/CardList.vue')
  },
  {
    path: '/d3test',
    name: 'D3Test',
    component: () => import('../components/D3Test.vue')
  },
  {
    path: '/sunburst',
    name: 'SunBurst',
    component: () => import('../components/SunBurst.vue')
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import('../components/Todo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
