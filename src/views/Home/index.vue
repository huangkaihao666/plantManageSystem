<template>
  <div class="bgcImage"></div>
</template>
<script setup>
import { onMounted } from 'vue'
// import { getUserAPI } from '@/apis/user.js'
import { getUserAPI } from '@/apis/login.js'
// import { useRouter } from 'vue-router'

// //未登录先跳转到登录页面
// const router = useRouter()
// if (!localStorage.getItem('login')) {
//   console.log('未登录')
//   router.replace('/login')
// }
onMounted(async () => {
  // const registerMsg = {
  //   username: 'huang',
  //   password: 'hkh666',
  //   confirm_pw: 'hkh666'
  // }
  // const loginMsg = {
  //   username: 'huang666',
  //   password: 'hkh666'
  // }
  // const res = await getRegisterAPI(registerMsg)
  const res = await getUserAPI()
  console.log('userMsg', res)

  // const res = await getRegisterAPI(registerMsg)
  // console.log('res', res)

  // const res1 = await getHomeAPI()
  // console.log('res', res1)
})
</script>
<style scoped>
.bgcImage {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/watering.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
