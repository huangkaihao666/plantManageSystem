<template>
	<a-layout style="width: 100vw; height: 100vh">
		<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
			<div class="logo" />
			<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
				<a-menu-item key="1">
					<HomeOutlined />
					<span>首页</span>
				</a-menu-item>
				<a-menu-item key="2">
					<UserOutlined />
					<span>角色管理</span>
				</a-menu-item>
				<a-menu-item key="3">
					<UsergroupAddOutlined />
					<span>用户管理</span>
				</a-menu-item>
			</a-menu>
		</a-layout-sider>
		<a-layout>
			<a-layout-header style="background: #fff; padding: 0">
				<menu-unfold-outlined
					v-if="collapsed"
					class="trigger"
					@click="() => (collapsed = !collapsed)"
				/>
				<menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
			</a-layout-header>
			<a-layout-content
				:style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
			>
				<!-- 二级路由出口(home等等，通常放在main主区域) -->
				<router-view />
			</a-layout-content>
		</a-layout>
	</a-layout>
</template>
<script setup>
import {
	UserOutlined,
	UsergroupAddOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	HomeOutlined,
} from '@ant-design/icons-vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
//路由切换
const route = useRoute();
const breadcrumbData = ref([]);
const getBreadcrumbData = () => {
	if (route.path !== '/login') {
		breadcrumbData.value = [];
		breadcrumbData.value.push('首页');
		if (route.path === '/') {
			return;
		}
		for (let i = 1; i < route.matched.length; i++) {
			let matchName = route.matched[i].name;
			console.log('当前路径', matchName);
			breadcrumbData.value.push(matchName);
		}
	} else {
		breadcrumbData.value.push('/login');
	}
};
watch(
	route,
	() => {
		getBreadcrumbData();
	},
	{
		immediate: true,
		deep: true,
	}
);

const selectedKeys = ref(['1']);
const collapsed = ref(false);
</script>
<style>
.trigger {
	font-size: 18px;
	line-height: 64px;
	padding: 0 24px;
	cursor: pointer;
	transition: color 0.3s;
}

.trigger:hover {
	color: #1890ff;
}

.logo {
	height: 32px;
	background: rgba(255, 255, 255, 0.3);
	margin: 16px;
}

.site-layout .site-layout-background {
	background: #fff;
}
</style>
