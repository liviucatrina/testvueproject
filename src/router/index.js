import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import ComponentA from '../components/ComponentA'
import ComponentB from '../components/ComponentB'
import ComponentB1 from '../components/ComponentB1'
import ComponentB2 from '../components/ComponentB2'
import Item from '../components/Item'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/componenta',
    name: 'ComponentA',
    component: ComponentA,
    children: [
      {
        name: 'ItemAdd',
        path: 'items/add',
        component: Item,
        props: true,
        meta: {
          showModal: true
        }
      },
      {
        name: 'ItemEdit',
        path: 'items/edit/:itemId',
        component: Item,
        props: true,
        meta: {
          showModal: true
        }
      },
      {
        name: 'ItemView',
        path: 'items/view/:itemId',
        component: Item,
        props: true,
        meta: {
          showModal: true
        }
      }
    ]
  },
  {
    path: '/componentb',
    name: 'ComponentB',
    component: ComponentB,
    children: [
      {
        name: 'B1',
        path: '/b1',
        component: ComponentB1,
      },
      {
        name: 'B2',
        path: '/b2',
        component: ComponentB2,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
