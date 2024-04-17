<template>
	<div class="ele-body">
		<a-card :bordered="false">
			<!-- 搜索表单 -->
			<rolesearch />
			<!-- 数据操作 -->
			<a-space style="margin-bottom: 10px">
				<a-button type="primary" class="ele-btn-icon">
					<template #icon>
						<plus-outlined />
					</template>
					<span>新建</span>
				</a-button>
				<a-button danger type="primary" class="ele-btn-icon">
					<template #icon>
						<delete-outlined />
					</template>
					<span>删除</span>
				</a-button>
			</a-space>
			<!-- 表格 -->
			<a-table :columns="columns" :dataSource="dataSource">
				<template #headerCell="{ column }">
					<template v-if="column.key === 'checkbox'">
						<a-checkbox />
					</template>
				</template>
				<template #bodyCell="{ column }">
					<template v-if="column.key === 'action'">
						<a-space>
							<a>修改</a>
							<a-divider type="vertical" />
							<a>分配权限</a>
							<a-divider type="vertical" />
							<a-popconfirm placement="topRight" title="确定要删除此角色吗？">
								<a class="ele-text-danger">删除</a>
							</a-popconfirm>
						</a-space>
					</template>
					<template v-if="column.key === 'checkbox'">
						<a-checkbox />
					</template>
				</template>
			</a-table>
		</a-card>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import rolesearch from './components/rolesearch.vue';

// 表格行数据
const dataSource = ref([
	{
		roleId: 1,
		roleName: '管理员',
		roleCode: 'admin',
		comments: '管理员',
		createTime: '2024-04-17 15:18:37',
	},
	{
		roleId: 2,
		roleName: '用户',
		roleCode: 'user',
		comments: '用户',
		createTime: '2024-04-17 15:18:37',
	},
	{
		roleId: 2,
		roleName: '游客',
		roleCode: 'user',
		comments: '游客',
		createTime: '2024-04-17 15:18:37',
	},
	{
		roleId: 2,
		roleName: '用户',
		roleCode: 'user',
		comments: '用户',
		createTime: '2024-04-17 15:18:37',
	},
	{
		roleId: 2,
		roleName: '用户',
		roleCode: 'user',
		comments: '用户',
		createTime: '2024-04-17 15:18:37',
	},
]);

// 表格列配置
const columns = ref([
	{
		key: 'checkbox',
		width: 48,
		align: 'center',
		fixed: 'left',
	},
	{
		key: 'index',
		width: 48,
		align: 'center',
		fixed: 'left',
	},
	{
		title: '角色名称',
		dataIndex: 'roleName',
	},
	{
		title: '角色标识',
		dataIndex: 'roleCode',
	},
	{
		title: '备注',
		dataIndex: 'comments',
	},
	{
		title: '创建时间',
		dataIndex: 'createTime',
		ellipsis: true,
	},
	{
		title: '操作',
		key: 'action',
		width: 220,
		align: 'center',
	},
]);
</script>
