<template>
  <div class="bgcImage"></div>
</template>
<script setup>
// import { useRouter } from 'vue-router'

// //未登录先跳转到登录页面
// const router = useRouter()
// if (!localStorage.getItem('login')) {
//   console.log('未登录')
//   router.replace('/login')
// }
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
