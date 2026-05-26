// src/types/account.ts

export type RoleLevel = 'ADMIN' | 'USER' | 'EDITOR' | 'VIEWER'

export const AccountStatus = {
  On: 'ON',
  Off: 'OFF',
} as const

export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus]

export interface Account {
  id: string
  name: string
  email: string
  roleLevel: RoleLevel
  status: AccountStatus
  createdAt?: string
}

export interface CreateAccountPayload {
  name: string
  email: string
  roleLevel: RoleLevel
  status: AccountStatus
}

export interface UpdateAccountPayload {
  name: string
  email: string
  roleLevel: RoleLevel
  status: AccountStatus
}
