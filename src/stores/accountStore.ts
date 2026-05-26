// src/stores/accountStore.ts

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getAccountsApi,
  createAccountApi,
  updateAccountApi,
  deleteAccountApi,
} from '@/api/accountApi'
import type {
  Account,
  CreateAccountPayload,
  UpdateAccountPayload,
} from '@/types/account'
import { AccountStatus } from '@/types/account'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([])
  const keyword = ref('')
  const loading = ref(false)
  const errorMessage = ref('')

  const filteredAccounts = computed(() => {
    const value = keyword.value.trim().toLowerCase()

    if (!value) return accounts.value

    return accounts.value.filter((account) => {
      return (
        account.name.toLowerCase().includes(value) ||
        account.email.toLowerCase().includes(value) ||
        account.roleLevel.toLowerCase().includes(value)
      )
    })
  })

  const totalCount = computed(() => accounts.value.length)

  const activeCount = computed(() => {
    return accounts.value.filter(
      (account) => account.status === AccountStatus.On
    ).length
  })

  const inactiveCount = computed(() => {
    return accounts.value.filter(
      (account) => account.status === AccountStatus.Off
    ).length
  })

  const fetchAccounts = async () => {
    try {
      loading.value = true
      errorMessage.value = ''

      accounts.value = await getAccountsApi()
    } catch {
      errorMessage.value = '帳號資料讀取失敗'
    } finally {
      loading.value = false
    }
  }

  const createAccount = async (payload: CreateAccountPayload) => {
    const newAccount = await createAccountApi(payload)
    accounts.value.unshift(newAccount)
  }

  const updateAccount = async (id: string, payload: UpdateAccountPayload) => {
    const updatedAccount = await updateAccountApi(id, payload)

    const index = accounts.value.findIndex((account) => account.id === id)

    if (index !== -1) {
      accounts.value[index] = updatedAccount
    }
  }

  const deleteAccount = async (id: string) => {
    await deleteAccountApi(id)
    accounts.value = accounts.value.filter((account) => account.id !== id)
  }

  return {
    accounts,
    keyword,
    loading,
    errorMessage,
    filteredAccounts,
    totalCount,
    activeCount,
    inactiveCount,
    fetchAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
  }
})