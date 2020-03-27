<template>
  <div>
    <h2>Beatles database</h2>
    <input class="input" type="text" placeholder="Find a song" v-model="search" @keyup="rechercher">
    <div class="row">
      <div v-for="item in collection">
        <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img v-bind:src=item.cover>
              <span class="card-title grey darken-3">{{item.name}}</span>
            </div>
  
            <div class="card-content">
              <p class="p-link" v-for="item in item.tracks" @click="routerLink(item)">
                {{item}}
              </p>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'index',
  created() {
    console.log("Je suis la");
    axios.get('http://localhost:3000').then((res) => {
      this.collection = res.data;
      console.log(this.collection)
    });
  },

  data() {
    return {
      collection: [],
      search: "",
      song: ""
    }
  },

  methods: {
    rechercher() {
      axios.get(`http://localhost:3000/search/${this.search}`).then((res) => {
        this.collection = res.data;
      });
    },

    routerLink(el) {
      this.song = el.split(" ").join("+");
      console.log(this.song);
      this.$router.push({ name: 'song', params: { song: this.song } });
    }
  }// closes methods
}//closes export
</script>

<style scoped>
.card-content {
  min-height: 450px;
}

.p-link {
  cursor: pointer;
}

.p-link:hover {
  font-weight: bold;
}
</style>
