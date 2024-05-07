<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <!-- 搜索表单 -->
      <rolesearch />
      <!-- 数据操作 -->
      <a-space style="margin-bottom: 10px">
        <a-button style="background-color: #5cc750" type="primary" class="ele-btn-icon">
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
      <a-table bordered :columns="columns" :dataSource="dataSource">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'checkbox'">
            <a-checkbox />
          </template>
          <template v-if="column.key === 'roleName'">
            <UserOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
          <template v-if="column.key === 'roleMark'">
            <UserAddOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
          <template v-if="column.key === 'roleComment'">
            <CommentOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
          <template v-if="column.key === 'createTime'">
            <HistoryOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
          <template v-if="column.key === 'action'">
            <SettingOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
        </template>
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <a-space>
              <!-- <a>修改</a>
              <a-divider type="vertical" />
              <a>分配权限</a>
              <a-divider type="vertical" /> -->
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
import { ref } from 'vue'
import {
  PlusOutlined,
  DeleteOutlined,
  UserOutlined,
  UserAddOutlined,
  CommentOutlined,
  HistoryOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import rolesearch from './components/rolesearch.vue'

// 表格行数据
const dataSource = ref([
  {
    roleId: 1,
    roleName: '管理员',
    roleCode: 'admin',
    comments: '管理员',
    createTime: '2024-04-17 15:18:37',
    index: '1'
  },
  {
    roleId: 2,
    roleName: '用户',
    roleCode: 'user',
    comments: '用户',
    createTime: '2024-04-17 15:18:37',
    index: '2'
  },
  {
    roleId: 2,
    roleName: '游客',
    roleCode: 'user',
    comments: '游客',
    createTime: '2024-04-17 15:18:37',
    index: '3'
  },
  {
    roleId: 2,
    roleName: '用户',
    roleCode: 'user',
    comments: '用户',
    createTime: '2024-04-17 15:18:37',
    index: '4'
  },
  {
    roleId: 2,
    roleName: '用户',
    roleCode: 'user',
    comments: '用户',
    createTime: '2024-04-17 15:18:37',
    index: '5'
  }
])

// 表格列配置
const columns = ref([
  {
    key: 'checkbox',
    width: 48,
    align: 'center'
  },
  {
    title: '编号',
    key: 'index',
    width: 70,
    align: 'center',
    dataIndex: 'index'
  },
  {
    key: 'roleName',
    title: '角色名称',
    dataIndex: 'roleName',
    align: 'center'
  },
  {
    key: 'roleMark',
    title: '角色标识',
    align: 'center',
    dataIndex: 'roleCode'
  },
  {
    key: 'roleComment',
    title: '备注',
    align: 'center',
    dataIndex: 'comments'
  },
  {
    key: 'createTime',
    title: '创建时间',
    align: 'center',
    dataIndex: 'createTime',
    ellipsis: true
  },
  {
    title: '操作',
    key: 'action',
    width: 220,
    align: 'center'
  }
])
</script>
