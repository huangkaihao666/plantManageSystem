import httpInstance from '@/utils/request.js'

//登录
const getLoginAPI = (username, password) => {
  return httpInstance({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

//注册
const getRegisterAPI = ({ username, password, confirm_pw }) => {
  return httpInstance({
    url: '/api/register',
    method: 'POST',
    data: {
      username,
      password,
      confirm_pw
    }
  })
}

//重置密码
const getResetPasswordAPI = ({ username, password, new_password, new_confirm_pw }) => {
  return httpInstance({
    url: '/api/reset_pw',
    method: 'POST',
    data: {
      username,
      password,
      new_password,
      new_confirm_pw
    }
  })
}

//退出登录
const getLogoutAPI = () => {
  return httpInstance({
    url: '/api/logout',
    method: 'POST'
  })
}

//首页
const getHomeAPI = () => {
  return httpInstance({
    url: '/api/index',
    method: 'POST'
  })
}

//显示用户
const getUserAPI = () => {
  return httpInstance({
    url: '/api/all_users',
    method: 'POST'
  })
}

export { getLoginAPI, getRegisterAPI, getResetPasswordAPI, getLogoutAPI, getHomeAPI, getUserAPI }
