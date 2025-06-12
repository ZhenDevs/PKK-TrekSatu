<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white shadow-lg rounded-xl p-8 space-y-8">
      <div>
        <h2 class="mt-4 text-center text-3xl font-bold text-gray-900">Buat Akun Baru</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Atau
          <NuxtLink to="/login" class="font-medium text-primary hover:text-primary/80 transition-colors">
            masuk dengan akun yang sudah ada
          </NuxtLink>
        </p>
      </div>
      
      <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
        {{ errorMessage }}
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <div class="mt-1">
              <input 
                id="name" 
                v-model="form.name" 
                name="name" 
                type="text" 
                autocomplete="name" 
                required 
                class="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary transition-colors"
                :class="{'border-red-300': errors.name}"
              >
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
            </div>
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1">
              <input 
                id="email" 
                v-model="form.email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                class="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary transition-colors"
                :class="{'border-red-300': errors.email}"
              >
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
            </div>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1 relative">
              <input 
                id="password" 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'" 
                name="password" 
                autocomplete="new-password" 
                required 
                class="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary transition-colors pr-10"
                :class="{'border-red-300': errors.password}"
              >
              <button 
                type="button" 
                @click="showPassword = !showPassword" 
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg 
                  v-if="showPassword" 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg 
                  v-else 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
            </div>
            
            <!-- Password strength indicator -->
            <div v-if="form.password" class="mt-2">
              <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div 
                  class="h-1.5 rounded-full transition-all duration-300" 
                  :class="passwordStrengthClass"
                  :style="{ width: `${passwordStrength * 25}%` }"
                ></div>
              </div>
              <p class="text-xs mt-1" :class="passwordStrengthTextClass">
                {{ passwordStrengthText }}
              </p>
            </div>
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
            <div class="mt-1">
              <input 
                id="confirm-password" 
                v-model="form.confirmPassword" 
                type="password" 
                autocomplete="new-password" 
                required 
                class="appearance-none block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary transition-colors"
                :class="{'border-red-300': errors.confirmPassword}"
              >
              <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <input 
            id="terms" 
            v-model="form.agreeToTerms" 
            type="checkbox" 
            class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-colors cursor-pointer"
            :class="{'border-red-300': errors.agreeToTerms}"
          >
          <label for="terms" class="ml-2 block text-sm text-gray-700">
            Saya setuju dengan <a href="#" class="text-primary hover:text-primary/80 transition-colors">Syarat dan Ketentuan</a>
          </label>
        </div>
        <p v-if="errors.agreeToTerms" class="mt-1 text-sm text-red-600">{{ errors.agreeToTerms }}</p>

        <div>
          <button 
            type="submit" 
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors font-medium"
            :disabled="loading"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ loading ? 'Memproses...' : 'Daftar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'dashboard',
});

const router = useRouter();
const apiBaseUrl = import.meta.env.VITE_API_URL;;

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
});

const errors = ref({});
const loading = ref(false);
const errorMessage = ref('');
const showPassword = ref(false);

const passwordStrength = computed(() => {
  if (!form.value.password) return 0;
  
  let strength = 0;
  
  if (form.value.password.length >= 8) strength++;
  
  if (/[a-z]/.test(form.value.password)) strength++;
  
  if (/[A-Z]/.test(form.value.password)) strength++;
  
  if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.value.password)) strength++;
  
  return strength;
});

const passwordStrengthClass = computed(() => {
  switch (passwordStrength.value) {
    case 1: return 'bg-red-500';
    case 2: return 'bg-yellow-500';
    case 3: return 'bg-blue-500';
    case 4: return 'bg-green-500';
    default: return 'bg-red-500';
  }
});

const passwordStrengthText = computed(() => {
  switch (passwordStrength.value) {
    case 1: return 'Password sangat lemah';
    case 2: return 'Password lemah';
    case 3: return 'Password cukup kuat';
    case 4: return 'Password kuat';
    default: return 'Password sangat lemah';
  }
});

const passwordStrengthTextClass = computed(() => {
  switch (passwordStrength.value) {
    case 1: return 'text-red-600';
    case 2: return 'text-yellow-600';
    case 3: return 'text-blue-600';
    case 4: return 'text-green-600';
    default: return 'text-red-600';
  }
});

const validateForm = () => {
  errors.value = {};
  let isValid = true;
  
  if (!form.value.name.trim()) {
    errors.value.name = 'Nama harus diisi';
    isValid = false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Email tidak valid';
    isValid = false;
  }
  
  if (form.value.password.length < 6) {
    errors.value.password = 'Password minimal 6 karakter';
    isValid = false;
  }
  
  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Konfirmasi password tidak sesuai';
    isValid = false;
  }
  
  if (!form.value.agreeToTerms) {
    errors.value.agreeToTerms = 'Anda harus menyetujui syarat dan ketentuan';
    isValid = false;
  }
  
  return isValid;
};

const register = async () => {
  if (!validateForm()) return;
  
  loading.value = true;
  errorMessage.value = '';
  
  try {
    const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Terjadi kesalahan saat pendaftaran');
    }
    
    localStorage.setItem('token', data.token);
    
    setTimeout(() => {
      router.push('/login?registered=true');
    }, 1000);
    
  } catch (error) {
    console.error('Registration error:', error);
    errorMessage.value = error.message || 'Terjadi kesalahan saat pendaftaran';
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