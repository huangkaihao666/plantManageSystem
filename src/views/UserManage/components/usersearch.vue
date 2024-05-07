<!-- 搜索表单 -->
<template>
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
        <a-form-item label="电话号码">
          <a-input v-model:value.trim="form.phoneNumber" placeholder="请输入电话号码" allow-clear
            ><template #suffix><WhatsAppOutlined style="color: #ccc" /> </template
          ></a-input>
        </a-form-item>
      </a-col>
      <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <a-form-item label="性别">
          <a-select v-model:value="form.sex" placeholder="请选择性别" allow-clear>
            <a-select-option value="1">男</a-select-option>
            <a-select-option value="2">女</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
          <a-space>
            <a-button style="background-color: #5cc750" type="primary">查询</a-button>
            <a-button>重置</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup>
import { ref } from 'vue'
import { UserOutlined, WhatsAppOutlined } from '@ant-design/icons-vue'
// 表单数据
const form = ref({
  username: '',
  nickname: '',
  sex: '',
  phoneNumber: ''
})
</script>
