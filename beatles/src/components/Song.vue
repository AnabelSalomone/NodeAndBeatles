<template>
	<div v-if="load">
		<h1>
			TEST WORKING</h1>
	
		{{song|spaces}}
	</div>
</template>

<script>
import axios from 'axios';


export default {
	name: 'song',
	data() {
		return {
			song: '',
			load: false
		}
	},

	created() {
		axios.get(`http://localhost:3000/song/${this.$route.params.song}`).then((res) => {
			console.log(res.data);
			this.song = res.data;
			window.scrollTo(0, 0);
			console.log("song: " + this.song)
			this.load = true;
		});
	},

	filters: {
		spaces(elt) {
			return elt.split("+").join(" ");
		}
	}
}
</script>