<template>
  <div style="width: 400px; height: 200px">
    <a-upload-dragger
      v-model:fileList="fileList"
      name="file"
      :multiple="true"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      @change="handleChange"
      @drop="handleDrop"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">请点击或拖拽文件到此区域进行上传</p>
      <p class="ant-upload-hint">支持一次上传一个或者多个文件</p>
    </a-upload-dragger>
  </div>
</template>
<script setup>
import { InboxOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
const fileList = ref([])
const handleChange = (info) => {
  const status = info.file.status
  if (status !== 'uploading') {
    console.log(info.file, info.fileList)
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`)
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`)
  }
}
function handleDrop(e) {
  console.log(e)
}
</script>
