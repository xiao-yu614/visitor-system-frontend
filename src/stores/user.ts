import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as loginApi, logout as logoutApi } from '@/api/auth'
import { setToken, removeToken } from '@/utils/token'
import type { LoginForm } from '@/types/auth'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<unknown>(null)
  const token = ref<string | null>(null)

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
    await logoutApi()
    userInfo.value = null
    token.value = null
    removeToken()
  }

  const setUserInfo = (info: unknown) => {
    userInfo.value = info
  }

  return {
    userInfo,
    token,
    login,
    logout,
    setUserInfo
  }
})
