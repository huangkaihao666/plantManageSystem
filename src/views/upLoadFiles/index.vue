<template>
  <div style="display: flex; justify-content: space-between">
    <!-- 文件上传 -->
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
    <!-- 删除资源数据 -->
    <div style="width: 400px">
      <a-card size="small" class="a-card-border-radius">
        <a-form-item label="品种名">
          <a-input
            v-model:value="delFomeData"
            placeholder="请输入您要删除的品种名"
            style="border-radius: 5px"
          />
        </a-form-item>
        <template #title
          ><div style="display: flex; align-items: center; gap: 10px">
            <h5 style="font-weight: 550; font-size: 20px; color: #32af69">删除资源数据</h5>
          </div></template
        >
        <template #actions>
          <a-button type="primary" danger style="margin-top: 20px" @click="handleDelResources"
            >删除</a-button
          >
        </template></a-card
      >
    </div>
  </div>
  <!-- 资源上传数据 -->
  <a-card style="margin-top: 20px" size="small" class="a-card-border-radius">
    <h4>品种名属性：</h4>
    <a-row class="rowSpaceAround"
      ><a-col :span="4"
        ><a-form-item label="品种名">
          <a-input
            v-model:value="resourcesData.name"
            placeholder="请输入品种名"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"></a-col><a-col :span="4"></a-col><a-col :span="4"></a-col
      ><a-col :span="4"></a-col
    ></a-row>
    <h4>植株属性：</h4>
    <a-row class="rowSpaceAround"
      ><a-col :span="4"
        ><a-form-item label="芽数">
          <a-input
            v-model:value="resourcesData.zz_ys"
            placeholder="请输入芽数"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="株高">
          <a-input
            v-model:value="resourcesData.zz_zg"
            placeholder="请输入株高"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="株幅">
          <a-input
            v-model:value="resourcesData.zz_zf"
            placeholder="请输入株幅"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"></a-col><a-col :span="4"></a-col
    ></a-row>
    <h4>叶片属性：</h4>
    <a-row class="rowSpaceAround"
      ><a-col :span="4"
        ><a-form-item label="长度">
          <a-input
            v-model:value="resourcesData.leaf_length"
            placeholder="请输入长度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="宽度">
          <a-input
            v-model:value="resourcesData.leaf_width"
            placeholder="请输入宽度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="绿色程度">
          <a-input
            v-model:value="resourcesData.leaf_green"
            placeholder="请输入绿色程度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="SPAD">
          <a-input
            v-model:value="resourcesData.leaf_SPAD"
            placeholder="请输入SPAD"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="脉间隆起">
          <a-input
            v-model:value="resourcesData.leaf_mjlq"
            placeholder="请输入脉间隆起程度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
    ></a-row>
    <h4>叶柄属性：</h4>
    <a-row class="rowSpaceAround"
      ><a-col :span="4"
        ><a-form-item label="叶鞘长">
          <a-input
            v-model:value="resourcesData.yb_ysc"
            placeholder="请输入叶鞘长"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="5"
        ><a-form-item label="从叶鞘到叶片长">
          <a-input
            v-model:value="resourcesData.yb_ysc2"
            placeholder="请输入从叶鞘到叶片长"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="6"
        ><a-form-item label="部连接到叶片部分的颜色">
          <a-input
            v-model:value="resourcesData.yb_color"
            placeholder="请输入部连接到叶片部分的颜色"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="6"></a-col
    ></a-row>
    <h4>花梗属性：</h4>
    <a-row class="rowSpaceAround"
      ><a-col :span="6"
        ><a-form-item label="到佛焰苞基部的长度">
          <a-input
            v-model:value="resourcesData.hg_length"
            placeholder="请输入到佛焰苞基部的长度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="3"></a-col><a-col :span="3"></a-col><a-col :span="4"></a-col
      ><a-col :span="4"></a-col
    ></a-row>
    <h4>佛焰苞属性：</h4>
    <a-row class="rowSpaceAround"
      ><a-col :span="5"
        ><a-form-item label="包合部分长度">
          <a-input
            v-model:value="resourcesData.fyb_partial_len"
            placeholder="请输入包合部分长度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="5"
        ><a-form-item label="长度">
          <a-input
            v-model:value="resourcesData.fyb_length"
            placeholder="请输入长度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="5"
        ><a-form-item label="宽度">
          <a-input
            v-model:value="resourcesData.fyb_width"
            placeholder="请输入宽度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="5"
        ><a-form-item label="离肉穗的距离">
          <a-input
            v-model:value="resourcesData.fyb_distance"
            placeholder="请输入离肉穗的距离"
            style="border-radius: 5px"
          /> </a-form-item></a-col
    ></a-row>
    <a-row class="rowSpaceAround"
      ><a-col :span="5"
        ><a-form-item label="基部主要形状">
          <a-input
            v-model:value="resourcesData.fyb_shape"
            placeholder="请输入基部主要形状"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="7"
        ><a-form-item label="内侧苞尖始扩展的绿色区域">
          <a-input
            v-model:value="resourcesData.fyb_in_region"
            placeholder="请输入内侧苞尖始扩展的绿色区域"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="7"
        ><a-form-item label="外侧苞关始扩展的绿色区域">
          <a-input
            v-model:value="resourcesData.fyb_out_region"
            placeholder="请输入外侧苞关始扩展的绿色区域"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="1"></a-col
    ></a-row>
    <h4>肉穗花序属性：</h4>
    <a-row class="rowSpaceAround"
      ><a-col :span="4"
        ><a-form-item label="穗梗长度">
          <a-input
            v-model:value="resourcesData.rs_sg_length"
            placeholder="请输入穗梗长度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="长度">
          <a-input
            v-model:value="resourcesData.rs_length"
            placeholder="请输入长度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="直径">
          <a-input
            v-model:value="resourcesData.rs_diameter"
            placeholder="请输入直径"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="7"
        ><a-form-item label="相对于包合梗部的穗梗姿态">
          <a-input
            v-model:value="resourcesData.rs_pose"
            placeholder="请输入相对于包合梗部的穗梗姿态"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="1"></a-col
    ></a-row>
    <h4>子房属性：</h4>
    <a-row class="rowSpaceAround"
      ><a-col :span="4">
        <a-form-item label="顶端形状">
          <a-input
            v-model:value="resourcesData.zf_shape"
            placeholder="请输入顶端形状"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="开花时间">
          <a-input
            v-model:value="resourcesData.flower_time"
            placeholder="请输入开花时间"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"></a-col><a-col :span="4"></a-col><a-col :span="4"></a-col
    ></a-row>
    <h4>第三部分属性：</h4>
    <a-row class="rowSpaceAround"
      ><a-col :span="4"
        ><a-form-item label="抗病">
          <a-input
            v-model:value="resourcesData.kb"
            placeholder="请输入抗病情况"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="抗旱">
          <a-input
            v-model:value="resourcesData.kh"
            placeholder="请输入抗旱情况"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"></a-col><a-col :span="4"></a-col><a-col :span="4"></a-col
    ></a-row>
    <h4>第四部分属性：</h4>
    <a-row class="rowSpaceAround"
      ><a-col :span="4"
        ><a-form-item label="光照">
          <a-input
            v-model:value="resourcesData.light"
            placeholder="请输入光照强度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="温度">
          <a-input
            v-model:value="resourcesData.temperature"
            placeholder="请输入温度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="湿度">
          <a-input
            v-model:value="resourcesData.humidity"
            placeholder="湿度"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"
        ><a-form-item label="土壤">
          <a-input
            v-model:value="resourcesData.soil"
            placeholder="请输入土壤情况"
            style="border-radius: 5px"
          /> </a-form-item></a-col
      ><a-col :span="4"></a-col
    ></a-row>
    <template #title
      ><div style="display: flex; align-items: center; gap: 10px">
        <h5 style="font-weight: 550; font-size: 20px; color: #32af69">上传资源数据</h5>
      </div></template
    >
    <template #actions>
      <a-button
        style="background-color: #5cc750; margin-top: 20px; color: #fff"
        @click="handleUploadResources"
        >上传</a-button
      >
    </template></a-card
  >
</template>
<script setup>
import { InboxOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { uploadResourcesAPI, delResourcesAPI } from '@/apis/resources'

//资源字段
const resourcesData = ref({
  name: '',
  zz_ys: '',
  zz_zg: '',
  zz_zf: '',
  leaf_length: '',
  leaf_width: '',
  leaf_green: '',
  leaf_SPAD: '',
  leaf_mjlq: '',
  yb_ysc: '',
  yb_ysc2: '',
  yb_color: '',
  hg_length: '',
  fyb_partial_len: '',
  fyb_length: '',
  fyb_width: '',
  fyb_distance: '',
  fyb_shape: '',
  fyb_in_region: '',
  fyb_out_region: '',
  rs_sg_length: '',
  rs_length: '',
  rs_diameter: '',
  rs_pose: '',
  zf_shape: '',
  flower_time: '',
  kb: '',
  kh: '',
  light: '',
  temperature: '',
  humidity: '',
  soil: ''
})

//上传资源数据
const handleUploadResources = async () => {
  console.log('uploadData', resourcesData.value)
  const res = await uploadResourcesAPI(resourcesData.value)
  console.log('upload', res)
  if (res.response?.status && res.response?.status != 200) {
    message.error(res.response?.data?.data)
  } else {
    message.success(res.data)
  }
}

//删除资源数据
const delFomeData = ref('')
const handleDelResources = async () => {
  const res = await delResourcesAPI(delFomeData.value)
  console.log('del', res)
  if (res.response?.status && res.response?.status != 200) {
    message.error(res.response?.data?.data)
  } else {
    message.success(res.data)
  }
  delFomeData.value = ''
}

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
<style lang="less" scoped>
.rowSpaceAround {
  display: flex;
  justify-content: space-around;
}
.a-card-border-radius {
  border-radius: 5px;
  border: 1px solid #d5dadf;
}
</style>
