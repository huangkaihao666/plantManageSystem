<template>
	<a-layout style="width: 100vw; height: 100vh">
		<a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
			<div class="logo"></div>
			<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
				<!-- 处理路由跳转 -->
				<a-menu-item @click="handleRouteChange('/')" key="1">
					<HomeOutlined />
					<span>首页</span>
				</a-menu-item>
				<a-menu-item @click="handleRouteChange('/role')" key="2">
					<UserOutlined />
					<span>角色管理</span>
				</a-menu-item>
				<a-menu-item @click="handleRouteChange('/user')" key="3">
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
				<div class="topAvatar">
					<a-avatar
						class="avatar"
						src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
					/>
					<a-dropdown>
						<a class="ant-dropdown-link" @click.prevent>
							admin
							<DownOutlined />
						</a>
						<template #overlay>
							<a-menu>
								<a-menu-item>
									<a href="javascript:;">个人中心</a>
								</a-menu-item>
								<a-popconfirm
									placement="topRight"
									@confirm="confirm"
									@cancel="cancel"
									title="确认退出吗?"
									confirm-button-text="确认"
									cancel-button-text="取消"
								>
									<a-menu-item v-if="isLogin">退出登录</a-menu-item>
								</a-popconfirm>
								<a-menu-item v-if="!isLogin" @click="$router.push('/login')">去登录</a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</div>
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
	DownOutlined,
} from '@ant-design/icons-vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';

const selectedKeys = ref(['1']);
const collapsed = ref(false);

// 登录状态
const isLogin = ref(false);
const confirm = (e) => {
	console.log(e);
	message.success('退出登录成功！！！');
};
const cancel = (e) => {
	console.log(e);
	message.error('退出登录取消！！！');
};

//路由切换
const router = useRouter();
// 处理页面刷新之后高亮菜单和显示的组件不一致的情况
onMounted(() => {
	const route = useRoute();
	// console.log('route', route.path);
	if (route.path === '/') {
		selectedKeys.value = ['1'];
	} else if (route.path === '/role') {
		selectedKeys.value = ['2'];
	} else if (route.path === '/user') {
		selectedKeys.value = ['3'];
	}
});
const handleRouteChange = (path) => {
	// 路由切换要使用router对象而不是route对象(获取当前路由元信息)
	router.push(path);
};

// const breadcrumbData = ref([]);
// const getBreadcrumbData = () => {
// 	if (route.path !== '/login') {
// 		breadcrumbData.value = [];
// 		breadcrumbData.value.push('首页');
// 		if (route.path === '/') {
// 			return;
// 		}
// 		for (let i = 1; i < route.matched.length; i++) {
// 			let matchName = route.matched[i].name;
// 			console.log('当前路径', matchName);
// 			breadcrumbData.value.push(matchName);
// 		}
// 	} else {
// 		breadcrumbData.value.push('/login');
// 	}
// };
// watch(
// 	route,
// 	() => {
// 		getBreadcrumbData();
// 	},
// 	{
// 		immediate: true,
// 		deep: true,
// 	}
// );
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
	color: #fff;
	text-align: center;
	line-height: 32px;
}

.topAvatar {
	float: right;
	margin-right: 40px;
	div {
		display: inline-block;
	}
	.el-dropdown-link {
		color: #fff;
	}
	.el-avatar {
		margin: 0 20px;
	}
	.logoutLink {
		text-decoration: none;
	}
}
</style>
