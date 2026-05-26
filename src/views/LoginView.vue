<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { SESSION_EMAIL_KEY } from '@/router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const canSubmit = computed(() => {
  return email.value.trim().length > 0 && password.value.length > 0 && !loading.value
})

const handleSubmit = async () => {
  if (!canSubmit.value) return

  try {
    loading.value = true
    errorMessage.value = ''

    if (!emailPattern.test(email.value.trim())) {
      errorMessage.value = '請輸入有效的電子郵件'
      return
    }

    sessionStorage.setItem(SESSION_EMAIL_KEY, email.value.trim())
    await router.replace({ name: 'accounts' })
  } catch {
    errorMessage.value = '登入失敗，請稍後再試'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="flex min-h-svh flex-col items-center justify-center bg-[#eaf1ff] px-5 py-8 text-slate-900">
    <form
      class="w-full max-w-[520px] rounded-2xl bg-white px-6 py-10 shadow-[0_20px_50px_rgba(15,23,42,0.14)] sm:px-12 sm:py-14"
      @submit.prevent="handleSubmit"
    >
      <div
        class="mx-auto mb-6 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-gradient-to-br from-[#6d5dfc] to-[#4528ee] text-white"
        aria-hidden="true"
      >
        <svg
          class="size-10 fill-none stroke-current stroke-[2.4] [stroke-linecap:round] [stroke-linejoin:round]"
          viewBox="0 0 24 24"
          role="img"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <path d="M10 17l5-5-5-5" />
          <path d="M15 12H3" />
        </svg>
      </div>

      <header class="mb-10 text-center">
        <h1 class="mb-3 text-2xl font-semibold">歡迎回來</h1>
        <p class="m-0 text-slate-600">請登入您的帳號以繼續</p>
      </header>

      <label class="mb-7 grid gap-3 text-lg sm:text-xl">
        <span>電子郵件</span>
        <span
          class="flex min-h-14 items-center gap-3.5 rounded-xl border border-slate-300 px-4 transition focus-within:border-[#5236f6] focus-within:shadow-[0_0_0_4px_rgba(82,54,246,0.12)]"
        >
          <svg
            class="size-6 shrink-0 fill-none stroke-slate-400 stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M4 6h16v12H4z" />
            <path d="m4 7 8 6 8-6" />
          </svg>
          <input
            v-model="email"
            class="min-w-0 flex-1 border-0 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            autocomplete="email"
            inputmode="email"
            placeholder="your@email.com"
            type="email"
          />
        </span>
      </label>

      <label class="mb-7 grid gap-3 text-lg sm:text-xl">
        <span>密碼</span>
        <span
          class="flex min-h-14 items-center gap-3.5 rounded-xl border border-slate-300 px-4 transition focus-within:border-[#5236f6] focus-within:shadow-[0_0_0_4px_rgba(82,54,246,0.12)]"
        >
          <svg
            class="size-6 shrink-0 fill-none stroke-slate-400 stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <input
            v-model="password"
            class="min-w-0 flex-1 border-0 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
            autocomplete="current-password"
            placeholder="••••••••"
            type="password"
          />
        </span>
      </label>

      <div class="mb-7 mt-2 flex items-center justify-between">
        <span></span>
        <a class="text-[#5236f6] no-underline" href="#" @click.prevent>
          忘記密碼？
        </a>
      </div>

      <p v-if="errorMessage" class="-mt-2 mb-5 text-red-500">
        {{ errorMessage }}
      </p>

      <button
        class="flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#5236f6] text-xl font-semibold text-white transition hover:-translate-y-px hover:bg-[#4528ee] cursor-pointer disabled:cursor-not-allowed disabled:opacity-65"
        :disabled="!canSubmit"
        type="submit"
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
        <span>{{ loading ? '登入中' : '登入' }}</span>
      </button>

      <p class="mt-7 rounded-xl border border-blue-200 bg-blue-50 p-4 text-center text-blue-700">
        提示：輸入有效電子郵件和任意密碼即可登入
      </p>
    </form>

    <p class="mt-7 text-center text-lg text-slate-600">
      還沒有帳號？
      <a class="text-[#5236f6] no-underline" href="#" @click.prevent>
        立即註冊
      </a>
    </p>
  </main>
</template>
