<template>
	<div>
		<nav>
			<div class="nav-wrapper grey darken-3">
				<a href="#" class="brand-logo center">{{song|spaces}}</a>
				<ul id="nav-mobile" class="left hide-on-med-and-down">
					<li>
						<router-link :to="{ path: '/'}">
							<i class="material-icons">arrow_back</i>
						</router-link>
					</li>
				</ul>
			</div>
		</nav>
	
		<div class="container">
			<div class="row height-fix">
				<div v-if="load">
					<div class="video-container">
						<iframe width="853" height="480" :src=video frameborder="0"></iframe>
					</div>
				</div>
			</div>
			<div class="row center-align">
				<p class="btn grey darken-3" @click="changeVideo()"> Try a new video!</p>
				<router-link :to="{ path: '/'}" class="btn grey darken-3"> Go back</router-link>
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
			console.log("done")
			this.load = true;
		})
	},
	methods: {
		randomQuoteId(ourMin, ourMax) {
			return Math.floor(Math.random() * (ourMax - ourMin + 1)) + ourMin;
		},

		changeVideo() {
			this.load = false;
			axios.get(`http://localhost:3000/video/${this.$route.params.song}`).then((res) => {
				let randomId = this.randomQuoteId(0, 9);
				console.log(randomId);
				this.video = `//www.youtube.com/embed/${res.data.items[randomId].id.videoId}`
				this.load = true;
			})
		}
	},

	filters: {
		spaces(elt) {
			return elt.split("+").join(" ");
		}
	}
}
</script>

<style scoped>
p {
	cursor: pointer;
}

.height-fix {
	min-height: 500px;
}

nav {
	margin-bottom: 20px;
}
</style>