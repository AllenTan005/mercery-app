<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import AccountCard from '@/components/AccountCard.vue'
import AccountFormModal from '@/components/AccountFormModal.vue'
import { SESSION_EMAIL_KEY } from '@/router'
import { useAccountStore } from '@/stores/accountStore'
import type { Account, CreateAccountPayload } from '@/types/account'

const router = useRouter()
const accountStore = useAccountStore()
const {
  keyword,
  loading,
  errorMessage,
  filteredAccounts,
  totalCount,
  activeCount,
  inactiveCount,
} = storeToRefs(accountStore)

const modalOpen = ref(false)
const saving = ref(false)
const editingAccount = ref<Account | null>(null)

const openCreateModal = () => {
  editingAccount.value = null
  modalOpen.value = true
}

const openEditModal = (account: Account) => {
  editingAccount.value = account
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  editingAccount.value = null
}

const submitForm = async (payload: CreateAccountPayload) => {
  try {
    saving.value = true

    if (editingAccount.value) {
      await accountStore.updateAccount(editingAccount.value.id, payload)
    } else {
      await accountStore.createAccount(payload)
    }

    closeModal()
    
    await accountStore.fetchAccounts()
  } finally {
    saving.value = false
  }
}

const deleteAccount = async (account: Account) => {
  const confirmed = window.confirm(`確定要刪除「${account.name}」嗎？`)

  if (!confirmed) return

  await accountStore.deleteAccount(account.id)
}

const logout = async () => {
  sessionStorage.removeItem(SESSION_EMAIL_KEY)
  sessionStorage.removeItem('accessToken')
  await router.replace({ name: 'login' })
}

onMounted(() => {
  void accountStore.fetchAccounts()
})
</script>

<template>
  <main class="min-h-svh bg-slate-50 text-slate-900">
    <header class="flex items-center gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-[7vw]">
      <div
        class="flex size-13 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#6d5dfc] to-[#4528ee] text-white"
        aria-hidden="true"
      >
        <svg
          class="size-8 fill-none stroke-current stroke-[2.4] [stroke-linecap:round] [stroke-linejoin:round]"
          viewBox="0 0 24 24"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
      <div>
        <h1 class="m-0 text-[22px] font-bold leading-tight sm:text-[28px]">
          帳號管理系統
        </h1>
        <p class="m-0 text-slate-600">管理您的所有帳號</p>
      </div>
      <button
        class="ml-auto flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100"
        type="button"
        @click="logout"
      >
        <svg
          class="size-6 fill-none stroke-current stroke-[2.4] [stroke-linecap:round] [stroke-linejoin:round]"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
        </svg>
        <span>登出</span>
      </button>
    </header>

    <section class="mx-auto max-w-[1680px] px-5 py-7 sm:px-[7vw] sm:py-11">
      <div class="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto]">
        <label
          class="flex min-h-16 items-center gap-3.5 rounded-xl border border-slate-300 bg-white px-4.5"
        >
          <svg
            class="size-6 shrink-0 fill-none stroke-slate-400 stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            v-model="keyword"
            class="min-w-0 flex-1 border-0 bg-transparent text-lg text-slate-900 outline-none placeholder:text-slate-400 sm:text-xl"
            placeholder="搜尋帳號（姓名、郵件、角色）..."
          />
        </label>

        <button
          class="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-[#5236f6] px-6 font-semibold text-white hover:bg-[#4528ee] lg:w-auto"
          type="button"
          @click="openCreateModal"
        >
          <svg
            class="size-6 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          <span>新增帳號</span>
        </button>
      </div>

      <div class="mb-10 grid gap-6 md:grid-cols-3">
        <article class="min-h-32 rounded-xl border border-slate-200 bg-white p-8 shadow-[0_2px_8px_rgba(15,23,42,0.08)]">
          <span class="mb-2 block text-xl text-slate-600">總帳號數</span>
          <strong class="text-[22px] font-medium">{{ totalCount }}</strong>
        </article>
        <article class="min-h-32 rounded-xl border border-slate-200 bg-white p-8 shadow-[0_2px_8px_rgba(15,23,42,0.08)]">
          <span class="mb-2 block text-xl text-slate-600">啟用中</span>
          <strong class="text-[22px] font-medium">{{ activeCount }}</strong>
        </article>
        <article class="min-h-32 rounded-xl border border-slate-200 bg-white p-8 shadow-[0_2px_8px_rgba(15,23,42,0.08)]">
          <span class="mb-2 block text-xl text-slate-600">已停用</span>
          <strong class="text-[22px] font-medium">{{ inactiveCount }}</strong>
        </article>
      </div>

      <p v-if="loading" class="my-9 text-center text-slate-600">
        帳號資料讀取中...
      </p>
      <p v-else-if="errorMessage" class="my-9 text-center text-red-500">
        {{ errorMessage }}
      </p>
      <p v-else-if="filteredAccounts.length === 0" class="my-9 text-center text-slate-600">
        目前沒有符合條件的帳號
      </p>

      <div v-else class="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        <AccountCard
          v-for="account in filteredAccounts"
          :key="account.id"
          :account="account"
          @delete="deleteAccount"
          @edit="openEditModal"
        />
      </div>
    </section>

    <AccountFormModal
      :account="editingAccount"
      :open="modalOpen"
      :saving="saving"
      @close="closeModal"
      @submit="submitForm"
    />
  </main>
</template>
