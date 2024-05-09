<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <!-- 搜索表单 -->
      <!-- <usersearch /> -->
      <a-form
        :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }"
        :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }"
      >
        <a-row :gutter="8">
          <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="用户账号">
              <a-input v-model:value.trim="form.username" placeholder="请输入用户账号" allow-clear
                ><template #suffix> <UserOutlined style="color: #ccc" /> </template
              ></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
              <a-space>
                <a-button style="background-color: #5cc750" type="primary" @click="searchUsers"
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
        row-key="userId"
        :dataSource="dataSource"
        :columns="columns"
        :scroll="{ x: 1000 }"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'checkbox'">
            <a-checkbox />
          </template>
          <template v-if="column.key === 'username'">
            <UserOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
          <template v-if="column.key === 'phone'">
            <WhatsAppOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
          <template v-if="column.key === 'sexName'">
            <ManOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
          <template v-if="column.key === 'roles'">
            <UserSwitchOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
          <template v-if="column.key === 'createTime'">
            <HistoryOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
          <template v-if="column.key === 'status'">
            <PieChartOutlined style="margin-right: 5px" />{{ column.title }}
          </template>
          <template v-if="column.key === 'action'">
            <SettingOutlined style="margin-right: 5px" />{{ column.title }}
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
              <!-- <a>修改</a>
              <a-divider type="vertical" />
              <a>重置密码</a> -->
              <!-- <a-divider type="vertical" /> -->
              <a-popconfirm
                placement="topRight"
                @confirm="handleDelUser(record)"
                title="确定要删除此用户吗？"
                ok-text="是"
                cancel-text="否"
              >
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
import { ref, onMounted, reactive } from 'vue'
import { getUserAPI, delUserAPI } from '@/apis/user.js'
import {
  UserOutlined,
  WhatsAppOutlined,
  ManOutlined,
  UserSwitchOutlined,
  HistoryOutlined,
  SettingOutlined,
  PieChartOutlined
} from '@ant-design/icons-vue'
// import usersearch from './components/usersearch.vue'
import { message } from 'ant-design-vue'

// 表单数据,查询用户
const form = ref({
  username: '',
  nickname: '',
  sex: '',
  phoneNumber: ''
})

const searchUsers = () => {
  console.log('form: ', form.value)
  const filteredData = dataSource.value.filter((item) => {
    const roleNameRegex = form.value.username ? new RegExp(form.value.username, 'i') : null

    if (roleNameRegex && !roleNameRegex.test(item.username)) {
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
    if (form.value.username == '') {
      dataSource.value = data.value
      return
    }
    message.success('查询成功！')
  }
  console.log('filtered data: ', dataSource.value)
}

// 表格数据
const dataSource = ref([
  // {
  //   userId: 1,
  //   username: '张三',
  //   nickname: '用户一',
  //   roles: [{ roleId: 1, roleName: '管理员' }],
  //   status: 1,
  //   sexName: '男',
  //   phone: '15768372977',
  //   createTime: '0000-00-00 00:00:00',
  //   index: '1'
  // },
  // {
  //   userId: 1,
  //   username: '李四',
  //   nickname: '用户二',
  //   roles: [{ roleId: 1, roleName: '普通用户' }],
  //   status: 1,
  //   sexName: '男',
  //   phone: '19865502885',
  //   createTime: '1111-11-11 11:11:11',
  //   index: '2'
  // },
  // {
  //   userId: 1,
  //   username: '王五',
  //   nickname: '用户三',
  //   roles: [{ roleId: 1, roleName: '普通用户' }],
  //   status: 1,
  //   sexName: '男',
  //   phone: '17227853754',
  //   createTime: '2222-22-22 22:22:22',
  //   index: '3'
  // }
])

//获取用户列表数据并格式化字段
const data = ref([])
onMounted(async () => {
  const res = await getUserAPI()
  console.log('userList: ', res)
  data.value = res.data
  data.value = data.value.map((item, index) => {
    index++
    return { ...item, index }
  })
  dataSource.value = data.value
})

// 表格列配置
const columns = ref([
  // {
  //   key: 'checkbox',
  //   width: 48,
  //   align: 'center'
  // },
  {
    key: 'index',
    width: 70,
    align: 'center',
    dataIndex: 'index',
    title: '编号'
  },
  {
    title: '用户账号',
    dataIndex: 'username',
    sorter: true,
    showSorterTooltip: false,
    align: 'center',
    key: 'username'
  },

  // {
  //   title: '手机号',
  //   dataIndex: 'phone',
  //   sorter: true,
  //   showSorterTooltip: false,
  //   align: 'center',
  //   key: 'phone'
  // },
  // {
  //   title: '性别',
  //   dataIndex: 'sexName',
  //   width: 100,
  //   align: 'center',
  //   key: 'sexName'
  // },
  // {
  //   title: '角色',
  //   key: 'roles',
  //   align: 'center'
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createTime',
  //   sorter: true,
  //   showSorterTooltip: false,
  //   ellipsis: true,
  //   align: 'center',
  //   key: 'createTime'
  // },
  // {
  //   title: '状态',
  //   key: 'status',
  //   dataIndex: 'status',
  //   width: 100,
  //   align: 'center'
  // },
  {
    title: '操作',
    key: 'action',
    width: 220,
    align: 'center'
  }
])

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

//修改用户状态

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
