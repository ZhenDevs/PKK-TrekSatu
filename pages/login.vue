<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full bg-white shadow-lg rounded-xl p-8 space-y-8">
            <div>
                <h2 class="mt-4 text-center text-3xl font-bold text-gray-900">Masuk ke Akun</h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Atau
                    <NuxtLink to="/register" class="font-medium text-primary hover:text-primary/80 transition-colors">
                        daftar akun baru
                    </NuxtLink>
                </p>
            </div>

            <div v-if="successMessage"
                class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {{ errorMessage }}
            </div>

            <form class="mt-8 space-y-6" @submit.prevent="login">
                <div class="space-y-4">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <div class="mt-1">
                            <input id="email" v-model="form.email" name="email" type="email" autocomplete="email"
                                required
                                class="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary transition-colors"
                                :class="{ 'border-red-300': errors.email }">
                            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
                        </div>
                    </div>

                    <div>
                        <div class="mt-1 relative">
                            <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                name="password" autocomplete="current-password" required
                                class="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary transition-colors pr-10"
                                :class="{ 'border-red-300': errors.password }">
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors font-medium"
                        :disabled="loading">
                        <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                        </span>
                        {{ loading ? 'Memproses...' : 'Masuk' }}
                    </button>
                </div>
            </form>


        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

definePageMeta({
    layout: 'dashboard',
});

const router = useRouter();
const route = useRoute();
const apiBaseUrl = import.meta.env.VITE_API_URL;

const form = ref({
    email: '',
    password: '',
    rememberMe: false
});

const errors = ref({});
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const showPassword = ref(false);

onMounted(() => {
    if (route.query.registered) {
        successMessage.value = 'Pendaftaran berhasil! Silakan login dengan akun baru Anda.';
    }
});

const validateForm = () => {
    errors.value = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.value.email)) {
        errors.value.email = 'Email tidak valid';
        isValid = false;
    }

    if (!form.value.password) {
        errors.value.password = 'Password harus diisi';
        isValid = false;
    }

    return isValid;
};

const login = async () => {
    if (!validateForm()) return;

    loading.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    try {
        const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: form.value.email,
                password: form.value.password,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Terjadi kesalahan saat login');
        }

        localStorage.setItem('token', data.token);

        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        successMessage.value = 'Login berhasil! Mengalihkan...';

        setTimeout(() => {
            router.push('/dashboard');
        }, 1000);

    } catch (error) {
        console.error('Login error:', error);
        errorMessage.value = error.message || 'Email atau password salah';
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.text-primary {
    color: #0284c7;
}

.bg-primary {
    background-color: #0284c7;
}

.hover\:bg-primary\/90:hover {
    background-color: rgba(2, 132, 199, 0.9);
}

.border-primary {
    border-color: #0284c7;
}

.hover\:text-primary:hover {
    color: #0284c7;
}

.hover\:text-primary\/80:hover {
    color: rgba(2, 132, 199, 0.8);
}

.focus\:ring-primary:focus {
    --tw-ring-color: #0284c7;
}

.focus\:border-primary:focus {
    border-color: #0284c7;
}
</style>