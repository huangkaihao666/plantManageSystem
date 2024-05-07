import axios from 'axios'

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
  (res) => res.data,
  (response) => {
    //统一错误提示

    //token失效
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

//导出axios实例
export default httpInstance
