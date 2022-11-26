<template>
	<div>
		<transition mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
import { read, utils, writeFile } from 'xlsx';
import comparingPage from './components/comparingPage.vue';
import mainPage from './components/mainPage.vue';
import resultPage from './components/resultPage.vue';

export default {
	name: 'App',
	comments: { comparingPage, mainPage, resultPage },
};
</script>

<style lang="scss">
html {
	font-size: 62.5%;
	height: 100%;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	color: #1c1c1c;
}
a {
	text-decoration: none;
}

.v-enter-active {
	opacity: 0;
}
.v-enter-to {
	opacity: 1;
	transition: all 0.2s ease-out;
}

.v-leave-from {
	opacity: 1;
}

.v-leave-to {
	opacity: 0;
	transition: all 0.2s ease-out;
}
</style>
