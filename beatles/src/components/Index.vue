<template>
 <div>
  <h2>Beatles database</h2>
    <div class="row">
      <div v-for="item in collection">
        <div class="col s12 m3">
          <div class="card">
            <div class="card-image">
              <img v-bind:src=item.cover>
              <span class="card-title">{{item.name}}</span>
            </div>
							
								<div class="card-content">
								 <p v-for="item in item.tracks"> {{item}} </p>
                </div>

          </div>
        </div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'index',
  created(){
  	console.log("Je suis la");
  	this.$http.get('http://localhost:3000').then((res) =>{
  	this.collection = res.body;
  });
},

data () {
    return {
      collection: []
    }
  },

methods: {
	 rechercher(){
     this.$http.get(`http://localhost:3000/search/${this.search}`).then((res) => {
      this.posts = res.body;
     });
   }
}// closes methods
}//closes export
</script>

<style scoped>
.card-content{
	min-height: 450px;
}
</style>
