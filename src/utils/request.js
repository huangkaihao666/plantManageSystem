import axios from 'axios'
import { message } from 'ant-design-vue'
import router from '@/router/index'

// 创建实例时配置默认值
const httpInstance = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 添加请求拦截器
httpInstance.interceptors.request.use(
  function (config) {
    const hasToken = localStorage.getItem('token')
    //按照后端要求拼接token数据
    if (hasToken) {
      config.headers['Authorization'] = `Bearer ${hasToken}`
      //记得Bearer后面有个空格，这一行在请求头中携带了token，格式较为固定
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
httpInstance.interceptors.response.use(
  (res) => {
    //统一错误提示
    //token失效
    const { data: response } = res || {}
    if (response?.error && response?.error === 'Token has expired') {
      message.error(response?.data)
      // console.log(router)
      // localStorage.removeItem('token')
      router.push('/login')
      return
    }
    return res?.data
  },
  function (error) {
    // //统一错误提示
    console.log('errRes', error)
    message.error(error?.response?.data?.data)
    return Promise.reject(error)
  }
)

//导出axios实例
export default httpInstance
