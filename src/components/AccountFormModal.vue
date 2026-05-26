<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { AccountStatus } from '@/types/account'
import type { Account, CreateAccountPayload, RoleLevel } from '@/types/account'

const props = defineProps<{
  account: Account | null
  open: boolean
  saving: boolean
}>()

const emit = defineEmits<{
  close: []
  submit: [payload: CreateAccountPayload]
}>()

const form = reactive<CreateAccountPayload>({
  name: '',
  email: '',
  roleLevel: 'USER',
  status: AccountStatus.On,
})

const title = computed(() => (props.account ? '編輯帳號' : '新增帳號'))

const roleOptions: Array<{ label: string; value: RoleLevel }> = [
  { label: '管理員', value: 'ADMIN' },
  { label: '用戶', value: 'USER' },
  { label: '編輯', value: 'EDITOR' },
  { label: '檢視者', value: 'VIEWER' },
]

const resetForm = () => {
  form.name = props.account?.name ?? ''
  form.email = props.account?.email ?? ''
  form.roleLevel = props.account?.roleLevel ?? 'USER'
  form.status = props.account?.status ?? AccountStatus.On
}

const clearForm = () => {
  form.name = ''
  form.email = ''
  form.roleLevel = 'USER'
  form.status = AccountStatus.On
}

watch(
  () => [props.open, props.account] as const,
  () => {
    if (props.open) {
      resetForm()
    } else {
      clearForm()
    }
  },
  { immediate: true }
)

const submitForm = () => {
  emit('submit', { ...form })
}
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/40 p-6"
    @click.self="$emit('close')"
  >
    <form
      class="grid w-full max-w-[520px] gap-5 rounded-2xl bg-white p-7 shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
      @submit.prevent="submitForm"
    >
      <header class="flex items-center justify-between gap-4">
        <h2 class="m-0 text-2xl font-bold">{{ title }}</h2>
        <button
          class="flex size-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
          type="button"
          aria-label="關閉"
          @click="$emit('close')"
        >
          <svg
            class="size-6 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </header>

      <label class="grid gap-2">
        <span class="font-semibold text-slate-700">姓名</span>
        <input
          v-model.trim="form.name"
          class="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-[#5236f6] focus:ring-4 focus:ring-[#5236f6]/10"
          required
        />
      </label>

      <label class="grid gap-2">
        <span class="font-semibold text-slate-700">電子郵件</span>
        <input
          v-model.trim="form.email"
          class="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-[#5236f6] focus:ring-4 focus:ring-[#5236f6]/10"
          required
          type="email"
        />
      </label>

      <label class="grid gap-2">
        <span class="font-semibold text-slate-700">角色</span>
        <select
          v-model="form.roleLevel"
          class="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-[#5236f6] focus:ring-4 focus:ring-[#5236f6]/10"
        >
          <option
            v-for="role in roleOptions"
            :key="role.value"
            :value="role.value"
          >
            {{ role.label }}
          </option>
        </select>
      </label>

      <label class="grid gap-2">
        <span class="font-semibold text-slate-700">狀態</span>
        <select
          v-model="form.status"
          class="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-[#5236f6] focus:ring-4 focus:ring-[#5236f6]/10"
        >
          <option :value="AccountStatus.On">啟用</option>
          <option :value="AccountStatus.Off">停用</option>
        </select>
      </label>

      <footer class="mt-2 flex items-center justify-end gap-4">
        <button
          type="button"
          class="flex min-h-12 items-center justify-center rounded-xl bg-slate-100 px-6 font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer"
          @click="$emit('close')"
        >
          取消
        </button>
        <button
          type="submit"
          class="flex min-h-12 items-center justify-center rounded-xl bg-[#5236f6] px-6 font-semibold text-white cursor-pointer hover:bg-[#4528ee] disabled:cursor-not-allowed disabled:opacity-65"
          :disabled="saving"
        >
          {{ saving ? '儲存中' : '儲存' }}
        </button>
      </footer>
    </form>
  </div>
</template>
