import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/views/Layout/index.vue';
import Home from '@/views/Home/index.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'layout',
			component: Layout,
			children: [
				{
					path: '', //设置默认二级路由时，path为空即可（访问该一级路由时，此路由也会渲染）
					name: '首页',
					component: Home,
				},
				{
					path: '/user',
					name: '用户管理',
					component: () => import('@/views/UserManage/index.vue'),
				},
				{
					path: '/role',
					name: '角色管理',
					component: () => import('@/views/RoleManage/index.vue'),
				},
			],
		},
		{
			path: '/login',
			component: () => import('@/views/Login/index.vue'),
		},
	],
});
router.beforeEach((to, from, next) => {
	//@test
	if (to.matched.length === 0) {
		// 页面不存在，说明是刷新事件
		// 在此处执行您需要的操作
		console.log('111');
	}
	next();
});

export default router;
