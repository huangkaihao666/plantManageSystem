<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <!-- 搜索表单 -->
      <!-- <rolesearch /> -->
      <a-form
        :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }"
        :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }"
      >
        <a-row :gutter="8">
          <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="角色名称">
              <a-input v-model:value.trim="form.roleName" placeholder="请输入角色名称" allow-clear>
                <template #suffix> <UserOutlined style="color: #ccc" /> </template
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="备注">
              <a-input v-model:value.trim="form.comments" placeholder="请输入备注" allow-clear
                ><template #suffix> <CommentOutlined style="color: #ccc" /> </template
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
              <a-space>
                <a-button type="primary" style="background-color: #5cc750" @click="searchUsers"
                  >查询</a-button
                >
                <!-- <a-button>重置</a-button> -->
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!-- 数据操作 -->
      <!-- <a-space style="margin-bottom: 10px">
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
      </a-space> -->
      <!-- 表格 -->
      <a-table
        :pagination="pagination"
        @change="handleTableChange"
        bordered
        :columns="columns"
        :dataSource="dataSource"
      >
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
          <template v-if="column.key === 'role'">
            <CommentOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
          <template v-if="column.key === 'action'">
            <SettingOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'roleName'">
            {{ record.username }}
          </template>
          <template v-if="column.key === 'role'">
            {{ record.role === 1 ? '管理员' : '普通用户' }}
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <!-- <a>修改</a>
              <a-divider type="vertical" />
              <a>分配权限</a>
              <a-divider type="vertical" /> -->
              <a-popconfirm
                @confirm="handleDelUser(record)"
                ok-text="是"
                cancel-text="否"
                placement="topRight"
                title="确定要删除此角色吗？"
              >
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
import { ref, onMounted, reactive } from 'vue'
import { getUserAPI, delUserAPI } from '@/apis/user.js'
import { message } from 'ant-design-vue'
import {
  UserOutlined,
  UserAddOutlined,
  CommentOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
// import rolesearch from './components/rolesearch.vue'

// 查询用户相关
const form = ref({
  roleName: '',
  comments: ''
})
const searchUsers = () => {
  console.log('form: ', form.value)
  const filteredData = dataSource.value.filter((item) => {
    const roleNameRegex = form.value.roleName ? new RegExp(form.value.roleName, 'i') : null
    const commentsRegex = form.value.comments ? new RegExp(form.value.comments, 'i') : null

    const roleMsg = ref('')
    if (item.role == 1) {
      roleMsg.value = '管理员'
    } else {
      roleMsg.value = '普通用户'
    }

    if (roleNameRegex && !roleNameRegex.test(item.username)) {
      return false
    }

    if (commentsRegex && !commentsRegex.test(roleMsg.value)) {
      return false
    }

    return true
  })

  dataSource.value = filteredData
  if (!dataSource.value.length) {
    console.log('无符合条件的数据')
    dataSource.value = data.value
    message.error('抱歉！没有符合条件的数据')
  } else {
    if (form.value.roleName == '' && form.value.comments == '') {
      dataSource.value = data.value
      return
    }
    message.success('查询成功！')
  }
  console.log('filtered data: ', dataSource.value)
}

// 表格行数据
const dataSource = ref([])
const data = ref([])

//获取用户列表数据并格式化字段
onMounted(async () => {
  const res = await getUserAPI()
  console.log('userList: ', res)
  data.value = res.data
  data.value = data.value.map((item, index) => {
    index++
    return { ...item, index }
  })
  console.log('roleList', data.value)
  dataSource.value = data.value
})

//删除指定用户
const handleDelUser = async (record) => {
  console.log('del', record.username)
  const res = await delUserAPI(record.username)
  //删除失败测试
  // const res = await delUserAPI('zs')
  console.log('delUser: ', res)
  if (res.response?.status && res.response.status != 200) {
    message.error(res.response.data.data)
    return
  } else {
    message.success(res.data)
    //更新数据
    const res1 = await getUserAPI()
    console.log('userList: ', res1)
    dataSource.value = res1.data
    dataSource.value = dataSource.value.map((item, index) => {
      index++
      return { ...item, index }
    })
    return
  }
}

// 表格列配置
const columns = ref([
  // {
  //   key: 'checkbox',
  //   width: 48,
  //   align: 'center'
  // },
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
  // {
  //   key: 'roleMark',
  //   title: '角色标识',
  //   align: 'center',
  //   dataIndex: 'roleCode'
  // },
  {
    key: 'role',
    title: '备注',
    align: 'center',
    dataIndex: 'role'
  },
  // {
  //   key: 'createTime',
  //   title: '创建时间',
  //   align: 'center',
  //   dataIndex: 'createTime',
  //   ellipsis: true
  // },
  {
    title: '操作',
    key: 'action',
    width: 220,
    align: 'center'
  }
])

//对于每页数据的管理
let pagination = reactive({
  total: dataSource.value.length,
  current: 1,
  pageSize: 5,
  showSizeChanger: true,
  pageSizeOptions: ['5', '4', '3'],
  showQuickJumper: true
})
// 对每页数据显示的交互
let handleTableChange = (pagina) => {
  console.log('pagination.current 第几页', pagina.current) //第几页
  console.log('pagina.pageSize 一页多少 ', pagina.pageSize) //一页多少
  pagination.current = pagina.current
  pagination.pageSize = pagina.pageSize
}
</script>
