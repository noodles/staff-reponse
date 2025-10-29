import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ResponseForm from './components/ResponseForm.vue'
import AboutPage from './pages/AboutPage.vue'
import CaseStudyPage from './pages/CaseStudyPage.vue'

const routes = [
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/case-studies/noodle-palace',
    name: 'CaseStudy',
    component: CaseStudyPage
  },
  {
    path: '/:shortcode',
    name: 'Response',
    component: ResponseForm,
    props: (route) => ({
      shortcode: route.params.shortcode,
      responseParam: route.query.response || ''
    })
  },
  {
    path: '/',
    redirect: '/about'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
