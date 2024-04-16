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
					path: '/UserManage',
					name: '用户管理',
					component: () => import('@/views/UserManage/index.vue'),
				},
				{
					path: '/RoleManage',
					name: '角色管理',
					component: () => import('@/views/RoleManage/index.vue'),
				},
			],
		},
	],
});

export default router;
