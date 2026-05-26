<script setup lang="ts">
import { AccountStatus } from '@/types/account'
import type { Account, RoleLevel } from '@/types/account'

defineProps<{
  account: Account
}>()

defineEmits<{
  edit: [account: Account]
  delete: [account: Account]
}>()

const roleLabelMap: Record<RoleLevel, string> = {
  ADMIN: '管理員',
  USER: '用戶',
  EDITOR: '編輯',
  VIEWER: '檢視者',
}

const statusLabelMap: Record<AccountStatus, string> = {
  ON: '啟用',
  OFF: '停用',
}
</script>

<template>
  <article
    class="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.08)] sm:p-8"
  >
    <div class="flex items-center gap-5">
      <div
        class="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6d5dfc] to-[#7b2ff7] text-white"
        aria-hidden="true"
      >
        <svg
          class="size-8 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
          viewBox="0 0 24 24"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <div>
        <h2 class="mb-1.5 mt-0 text-[22px] font-bold">{{ account.name }}</h2>
        <span
          class="inline-flex rounded-full px-3 py-2 text-sm font-bold leading-none text-white"
          :class="
            account.status === AccountStatus.Off ? 'bg-slate-400' : 'bg-green-500'
          "
        >
          {{ statusLabelMap[account.status] }}
        </span>
      </div>
    </div>

    <dl class="my-6 grid gap-4 border-b border-slate-200 pb-6 text-slate-600">
      <div class="flex min-w-0 items-center gap-3">
        <dt class="size-5 shrink-0 text-slate-600">
          <svg
            class="size-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M4 6h16v12H4z" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        </dt>
        <dd class="m-0 min-w-0 break-words">{{ account.email }}</dd>
      </div>
      <div class="flex min-w-0 items-center gap-3">
        <dt class="size-5 shrink-0 text-slate-600">
          <svg
            class="size-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </dt>
        <dd class="m-0">{{ roleLabelMap[account.roleLevel] }}</dd>
      </div>
      <div class="flex min-w-0 items-center gap-3">
        <dt class="size-5 shrink-0 text-slate-600">
          <svg
            class="size-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M3 10h18" />
          </svg>
        </dt>
        <dd class="m-0">{{ account.createdAt ?? '-' }}</dd>
      </div>
    </dl>

    <div class="grid grid-cols-2 gap-3">
      <button
        type="button"
        class="flex min-h-14 min-w-0 items-center justify-center gap-2.5 rounded-xl bg-indigo-50 px-3 text-lg font-semibold text-[#5236f6] hover:bg-indigo-100 cursor-pointer"
        @click="$emit('edit', account)"
      >
        <svg
          class="size-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
        <span>編輯</span>
      </button>
      <button
        type="button"
        class="flex min-h-14 min-w-0 items-center justify-center gap-2.5 rounded-xl bg-rose-50 px-3 
        text-lg font-semibold text-red-500 hover:bg-rose-100 cursor-pointer"
        @click="$emit('delete', account)"
      >
        <svg
          class="size-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
        <span>刪除</span>
      </button>
    </div>
  </article>
</template>
