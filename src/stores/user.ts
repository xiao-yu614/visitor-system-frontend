import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as loginApi, logout as logoutApi } from '@/api/auth'
import { setToken, removeToken, getToken } from '@/utils/token'
import type { LoginForm, UserInfo } from '@/types/auth'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)
  const token = ref<string | null>(null)

  const initUser = () => {
    const savedToken = getToken()
    if (savedToken) {
      token.value = savedToken
    }
  }

  const login = async (form: LoginForm) => {
    const result = await loginApi(form)
    if (result.token) {
      token.value = result.token
      userInfo.value = result.user
      setToken(result.token)
    }
    return result
  }

  const logout = async () => {
    try {
      await logoutApi()
    } catch {
      console.log('Logout API failed, but continuing with local logout')
    }
    userInfo.value = null
    token.value = null
    removeToken()
  }

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
  }

  return {
    userInfo,
    token,
    login,
    logout,
    setUserInfo,
    initUser
  }
})
