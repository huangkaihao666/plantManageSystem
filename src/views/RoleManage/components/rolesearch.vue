<!-- 搜索表单 -->
<template>
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
        <a-form-item label="角色标识">
          <a-input v-model:value.trim="form.roleCode" placeholder="请输入角色标识" allow-clear
            ><template #suffix> <UserAddOutlined style="color: #ccc" /> </template
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
            <a-button type="primary" style="background-color: #5cc750">查询</a-button>
            <a-button>重置</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup>
import { UserOutlined, UserAddOutlined, CommentOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
const form = ref({
  roleName: '',
  roleCode: '',
  comments: ''
})
</script>
