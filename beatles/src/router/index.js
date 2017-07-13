import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Test from '@/components/Test'



import axios from 'axios';


Vue.use(axios)
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: Index
    },

    {
      path: 'testing',
      name: 'testing',
      component: Test
    }
  ]
})
