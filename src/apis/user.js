import httpInstance from '@/utils/request.js'

//显示用户
const getUserAPI = () => {
  return httpInstance({
    url: '/api/all_users',
    method: 'POST'
  })
}

//删除指定用户
const delUserAPI = (username) => {
  return httpInstance({
    url: `/api/user/${username}`,
    method: 'DELETE'
  })
}

export { getUserAPI, delUserAPI }
