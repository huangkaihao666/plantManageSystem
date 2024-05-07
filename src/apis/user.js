import httpInstance from '@/utils/request.js'

//显示用户
const getUserAPI = () => {
  return httpInstance({
    url: '/api/all_users',
    method: 'POST'
  })
}

export { getUserAPI }
