import Vue from 'vue';
import VueRouter from 'vue-router';
import mainPage from '../components/mainPage.vue';
import comparingPage from '../components/comparingPage.vue';
import resultPage from '../components/resultPage.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'main',
		component: mainPage,
	},
	{
		path: '/comparing',
		name: 'comparing',
		component: comparingPage,
	},
	{
		path: '/result',
		name: 'result',
		component: resultPage,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
