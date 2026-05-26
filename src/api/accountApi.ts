// src/api/accountApi.ts

import { http } from './http'
import type {
  Account,
  CreateAccountPayload,
  UpdateAccountPayload,
} from '@/types/account'

export interface GetAccountsParams {
  name?: string
  email?: string
}

export const getAccountsApi = async (params?: GetAccountsParams) => {
  const res = await http.get<Account[]>('/accounts', { params })
  return res.data
}

export const getAccountApi = async (id: string) => {
  const res = await http.get<Account>(`/account/${id}`)
  return res.data
}

export const createAccountApi = async (payload: CreateAccountPayload) => {
  const res = await http.post<Account>('/create-account', payload)
  return res.data
}

export const updateAccountApi = async (
  id: string,
  payload: UpdateAccountPayload
) => {
  const res = await http.patch<Account>(`/update-account/${id}`, payload)
  return res.data
}

export const deleteAccountApi = async (id: string) => {
  await http.delete(`/delete-account/${id}`)
}