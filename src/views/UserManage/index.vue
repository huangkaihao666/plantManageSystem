<template>
	<div class="ele-body">
		<a-card :bordered="false">
			<!-- 搜索表单 -->
			<usersearch />
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
			<a-table row-key="userId" :dataSource="dataSource" :columns="columns" :scroll="{ x: 1000 }">
				<template #headerCell="{ column }">
					<template v-if="column.key === 'checkbox'">
						<a-checkbox />
					</template>
				</template>
				<template #bodyCell="{ column, record }">
					<template v-if="column.key === 'checkbox'">
						<a-checkbox />
					</template>
					<template v-if="column.key === 'nickname'">
						<!-- <router-link :to="'/system/user/details?id=' + record.userId">
            </router-link> -->
						<div style="color: #1677ff">{{ record.nickname }}</div>
					</template>
					<template v-else-if="column.key === 'roles'">
						<a-tag v-for="item in record.roles" :key="item.roleId" color="blue">
							{{ item.roleName }}
						</a-tag>
					</template>
					<template v-else-if="column.key === 'status'">
						<a-switch
							:checked="record.status === 0"
							@change="(checked) => editStatus(checked, record)"
						/>
					</template>
					<template v-else-if="column.key === 'action'">
						<a-space>
							<a>修改</a>
							<a-divider type="vertical" />
							<a>重置密码</a>
							<a-divider type="vertical" />
							<a-popconfirm placement="topRight" title="确定要删除此用户吗？">
								<a class="ele-text-danger">删除</a>
							</a-popconfirm>
						</a-space>
					</template>
				</template>
			</a-table>
		</a-card>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import usersearch from './components/usersearch.vue';

// 表格数据
const dataSource = ref([
	{
		userId: 1,
		username: '张三',
		nickname: '用户一',
		roles: [{ roleId: 1, roleName: '管理员' }],
		status: 1,
		sexName: '男',
		phone: '15768372977',
		createTime: '0000-00-00 00:00:00',
	},
	{
		userId: 1,
		username: '李四',
		nickname: '用户二',
		roles: [{ roleId: 1, roleName: '普通用户' }],
		status: 1,
		sexName: '男',
		phone: '19865502885',
		createTime: '1111-11-11 11:11:11',
	},
	{
		userId: 1,
		username: '王五',
		nickname: '用户三',
		roles: [{ roleId: 1, roleName: '普通用户' }],
		status: 1,
		sexName: '男',
		phone: '17227853754',
		createTime: '2222-22-22 22:22:22',
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
		title: '用户账号',
		dataIndex: 'username',
		sorter: true,
		showSorterTooltip: false,
	},
	{
		title: '用户名',
		key: 'nickname',
		dataIndex: 'nickname',
		sorter: true,
		showSorterTooltip: false,
	},
	{
		title: '性别',
		dataIndex: 'sexName',
		width: 80,
		align: 'center',
		sorter: true,
		showSorterTooltip: false,
	},
	{
		title: '手机号',
		dataIndex: 'phone',
		sorter: true,
		showSorterTooltip: false,
	},
	{
		title: '角色',
		key: 'roles',
	},
	{
		title: '创建时间',
		dataIndex: 'createTime',
		sorter: true,
		showSorterTooltip: false,
		ellipsis: true,
	},
	{
		title: '状态',
		key: 'status',
		dataIndex: 'status',
		sorter: true,
		showSorterTooltip: false,
		width: 90,
		align: 'center',
	},
	{
		title: '操作',
		key: 'action',
		width: 220,
		align: 'center',
	},
]);
</script>
