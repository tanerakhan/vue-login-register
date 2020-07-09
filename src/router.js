import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home';
import Main from './components/Main';
import Login from './containers/Login';
import Register from './containers/Register';
import NotFound from './components/NotFound';

Vue.use(VueRouter);
export const router = new VueRouter({
	routes: [
		{ path: '*', component: NotFound },
		{ path: '/', component: Home },
		{ path: '/main', component: Main },
		{ path: '/login', component: Login },
		{ path: '/register', component: Register }
	],
	mode: 'history'
});
