<template>
  <a-row style="height: 100vh; width: 100vw"
    ><a-col :span="24"
      ><div
        style="
          background-image: url('src/assets/loginBgImg.jpg');
          width: 100%;
          height: 100vh;
          background-repeat: no-repeat;
          background-size: cover;
          position: relative;
          background-size: 120% auto;
          background-position: 0 -100px;
        "
      >
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
          <a-card v-if="loginStatus === '1'" style="width: 500px"
            ><a-form
              :model="formState"
              name="normal_login"
              class="login-form"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                label="账号名称"
                name="username"
                :rules="[{ required: true, message: '请输入账号名称!' }]"
              >
                <a-input placeholder="请输入账号名称" v-model:value="formState.username">
                  <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item
                style="width: 423px; margin-left: 28px"
                label="密码"
                name="password"
                :rules="[{ required: true, message: '请输入密码!' }]"
              >
                <a-input-password placeholder="请输入密码" v-model:value="formState.password">
                  <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item>
                <div style="display: flex; justify-content: center">
                  <a-button
                    type="primary"
                    html-type="submit"
                    style="background-color: #28c09a; width: 80px"
                  >
                    登录
                  </a-button>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <a-button type="link" @click="changeStatus('3')">重置密码</a-button>
                </div>
              </a-form-item>
            </a-form>
            <template #title><h1 style="text-align: center">管理员登录</h1></template> </a-card
          ><a-card v-if="loginStatus === '3'" style="width: 500px"
            ><a-form
              :model="formState"
              name="normal_login"
              class="login-form"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                label="账号名称"
                name="username"
                :rules="[{ required: true, message: '请输入账号名称!' }]"
              >
                <a-input placeholder="请输入账号名称" v-model:value="formState.username">
                  <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item
                style="width: 423px; margin-left: 28px"
                label="密码"
                name="password"
                :rules="[{ required: true, message: '请输入密码!' }]"
              >
                <a-input-password placeholder="请输入密码" v-model:value="formState.password">
                  <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item
                style="width: 440px; margin-left: 11px"
                label="确认密码"
                name="password"
                :rules="rules.checkPass"
              >
                <a-input-password
                  placeholder="请再次输入密码"
                  v-model:value="formState.comfirmPassword"
                >
                  <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item>
                <div style="display: flex; justify-content: center">
                  <a-button
                    type="primary"
                    html-type="submit"
                    style="background-color: #28c09a; width: 80px"
                  >
                    重置
                  </a-button>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <a-button type="link" @click="changeStatus('1')">登录</a-button>
                </div>
              </a-form-item>
            </a-form>
            <template #title><h1 style="text-align: center">重置管理员密码</h1></template>
          </a-card>
        </div>
      </div>
    </a-col></a-row
  >
</template>
<script setup>
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
const router = useRouter()
const formState = reactive({
  username: '',
  password: '',
  comfirmPassword: '',
  remember: true
})
const onFinish = (values) => {
  console.log('Success:', values)
  //点击登录
  if (loginStatus.value === '1') {
    console.log('点击登录')
    message.success('登录成功！')
    router.replace('/')
  }
  //点击重置
  if (loginStatus.value === '3') {
    console.log('点击重置')
    message.success('重置成功！')
    loginStatus.value = '1'
  }
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
// 控制登录注册重置
const loginStatus = ref('1')
const changeStatus = (num) => {
  loginStatus.value = num
  formState.username = ''
  formState.password = ''
  formState.comfirmPassword = ''
}

const validatePass2 = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('请再次输入密码')
  } else if (value !== formState.comfirmPassword) {
    return Promise.reject('两次输入的密码不一致！')
  } else {
    return Promise.resolve()
  }
}
const rules = {
  checkPass: [
    {
      validator: validatePass2,
      trigger: 'blur'
    }
  ]
}
</script>
<style lang="less" scoped></style>
