<template>
  <a-row style="height: 100vh; width: 100vw"
    ><a-col :span="24"
      ><div
        style="
          /* background-image: url('src/assets/loginBgImg.jpg'); */
          width: 100%;
          height: 100vh;
          /* background-repeat: no-repeat;
          background-size: cover; */
          position: relative;
          /* background-size: 120% auto;
          background-position: 0 -100px; */
        "
      >
        <img src="@/assets/loginBgImg.jpg" style="width: 100%; height: 99vh; object-fit: cover" />
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
          <!-- 登录 -->
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
            <template #title><h1 style="text-align: center">管理员登录</h1></template>
          </a-card>
          <!-- 重置 -->
          <a-card v-if="loginStatus === '3'" style="width: 500px"
            ><a-form :model="formState" name="normal_login" class="login-form">
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
                style="width: 420px; margin-left: 25px"
                label="新密码"
                name="new_password"
                :rules="[{ required: true, message: '请输入新密码!' }]"
              >
                <a-input-password
                  style="width: 370px"
                  placeholder="请输入新密码"
                  v-model:value="formState.new_password"
                >
                  <template #prefix>
                    <LockOutlined class="site-form-item-icon" />
                  </template>
                </a-input-password>
              </a-form-item>

              <a-form-item
                style="width: 440px; margin-left: -2px"
                label="新确认密码"
                name="new_confirm_password"
                :rules="[{ required: true, message: '请输入新确认密码!' }]"
              >
                <a-input-password
                  style="width: 370px"
                  placeholder="请输入新确认密码"
                  v-model:value="formState.new_confirm_pw"
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
                    @click="resetPWD"
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
import { getLoginAPI, getResetPasswordAPI } from '@/apis/login.js'
import { message } from 'ant-design-vue'
const router = useRouter()
const formState = reactive({
  username: '',
  password: '',
  new_password: '',
  new_confirm_pw: '',
  remember: true
})
//点击登录按钮
const onFinish = async () => {
  if (loginStatus.value === '1') {
    console.log('点击登录')
    console.log('name', formState.username, formState.password)
    const res = await getLoginAPI(formState.username, formState.password)
    console.log('denglu', res)
    if (res?.token && res?.role == 1) {
      console.log('token', res.token)
      localStorage.removeItem('token')
      localStorage.setItem('token', res.token)
      localStorage.setItem('username', formState.username)
      message.success('登录成功！')
      router.replace('/')
    } else if (res?.role == 2) {
      message.error('抱歉！当前用户不是管理员，没有权限登录...')
    } else {
      message.error(res.response.data.data)
      return
    }
  }
  //跳转到重置
  if (loginStatus.value === '3') {
    // console.log('点击重置')
    // message.success('重置成功！')
    loginStatus.value = '1'
  }
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
// 控制登录注册数据重置为空
const loginStatus = ref('1')
const changeStatus = (num) => {
  loginStatus.value = num
  formState.username = ''
  formState.password = ''
  formState.new_confirm_pw = ''
  formState.new_password = ''
}

//点击重置密码按钮
const resetPWD = async () => {
  console.log('点击重置')
  console.log('reset', formState)
  const res = await getResetPasswordAPI(formState)
  console.log('reset', res.response)
  if (res.response?.status && res.response.status != 200) {
    message.error(res.response.data.data)
  } else {
    message.success(res.data)
    //跳回登录界面
    loginStatus.value = '1'
  }
  // if (res.token) {
  //   console.log('token', res.token)
  //   localStorage.setItem('token', res.token)
  //   message.success('登录成功！')
  //   router.replace('/')
  // } else {
  //   message.error(res.response.data.data)
  //   return
  // }
}
</script>
<style lang="less" scoped></style>
