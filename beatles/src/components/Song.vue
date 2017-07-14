<template>
	<div v-if="load">
		<h3 class="center-align"> {{song|spaces}}</h3>
		<div class="row">
			<div class="container">
				<div class="video-container">
					<iframe width="853" height="480" :src=video frameborder="0"></iframe>
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>
import axios from 'axios';


export default {
	name: 'song',
	data() {
		return {
			song: '',
			load: false,
			video: ''
		}
	},

	created() {
		axios.get(`http://localhost:3000/song/${this.$route.params.song}`).then((res) => {
			console.log(res.data);
			this.song = res.data;
			window.scrollTo(0, 0);
			console.log("song: " + this.song);
		});

		axios.get(`http://localhost:3000/video/${this.$route.params.song}`).then((res) => {
			this.video = `//www.youtube.com/embed/${res.data.items[0].id.videoId}`
			console.log(res.data.items[0].id.videoId);
			console.log("done")
			this.load = true;
		})
	},

	filters: {
		spaces(elt) {
			return elt.split("+").join(" ");
		}
	}
}
</script>

<style scoped>

</style>