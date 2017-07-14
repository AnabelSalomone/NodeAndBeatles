import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios';
import Song from '@/components/Song'
import Index from '@/components/Index'


//Vue.use(axios) --> I was using this and it was causing a problem saying
// "cannot read property of undefined". Still looking for the explanation
//on when to use this line and when I shouldn't. 
//After deleting this line everything works fine.

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/song/:song',
      name: 'song',
      component: Song
    }
  ]
})
