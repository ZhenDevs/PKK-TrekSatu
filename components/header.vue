<template>
  <header class="sticky top-0 bg-white backdrop-blur-md bg-white/90 z-50 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <NuxtLink to="/" class="flex items-center group">
          <span class="text-2xl font-bold tracking-tight text-gray-900">Trek<span class="text-primary transition-all duration-300 group-hover:text-primary/80">Satu</span></span>
          <span class="ml-2 text-[10px] uppercase bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold tracking-wider">BETA</span>
        </NuxtLink>
        
        <nav class="hidden md:block">
          <ul class="flex space-x-10">
            <li v-for="(item, index) in navItems" :key="index">
              <NuxtLink :to="item.path" class="font-medium text-gray-700 hover:text-primary transition-all duration-300 relative overflow-hidden py-2 inline-block">
                <span class="relative z-10">{{ item.label }}</span>
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Desktop Authentication Buttons -->
        <div class="hidden md:flex items-center space-x-6">
          <!-- Show these buttons if not logged in -->
          <template v-if="!isAuthenticated">
            <NuxtLink to="/login" class="text-gray-700 hover:text-primary font-medium transition-all duration-300">
              Masuk
            </NuxtLink>
            <NuxtLink to="/register" class="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow">
              Daftar
            </NuxtLink>
          </template>
          
          <!-- Show dashboard button if logged in -->
          <template v-else>
            <NuxtLink to="/dashboard" class="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </NuxtLink>
          </template>
        </div>

        <button @click="isMenuOpen = !isMenuOpen" class="flex items-center justify-center w-10 h-10 rounded-lg md:hidden focus:outline-none">
          <span class="sr-only">Buka menu</span>
          <div class="relative w-6 h-5">
            <span 
              class="absolute block w-6 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out" 
              :class="{ 'rotate-45 top-2': isMenuOpen, 'top-0': !isMenuOpen }"
            ></span>
            <span 
              class="absolute top-2 block w-6 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out" 
              :class="{ 'opacity-0 translate-x-3': isMenuOpen }"
            ></span>
            <span 
              class="absolute block w-6 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out" 
              :class="{ '-rotate-45 top-2': isMenuOpen, 'top-4': !isMenuOpen }"
            ></span>
          </div>
        </button>
      </div>
    </div>

    <div 
      class="md:hidden transition-all duration-500 ease-in-out overflow-hidden"
      :class="isMenuOpen ? 'max-h-[450px] shadow-lg' : 'max-h-0'"
    >
      <ul class="flex flex-col px-5 py-3 bg-white/95 backdrop-blur-md">
        <li v-for="(item, index) in mobileNavItems" :key="index">
          <NuxtLink 
            @click="isMenuOpen = false" 
            :to="item.path" 
            class="flex items-center py-4 text-gray-700 hover:text-primary border-b border-gray-50 transition-colors duration-300"
          >
            <component :is="item.icon" class="h-5 w-5 mr-3" />
            {{ item.label }}
          </NuxtLink>
        </li>
        
        <!-- Mobile Authentication Buttons -->
        <li class="mt-3 pt-2">
          <!-- Show login/register if not authenticated -->
          <div v-if="!isAuthenticated" class="flex gap-3">
            <NuxtLink 
              @click="isMenuOpen = false" 
              to="/login" 
              class="flex-1 border border-gray-200 py-3.5 px-4 text-center rounded-lg text-gray-700 font-medium hover:border-gray-300 transition-all duration-300"
            >
              Masuk
            </NuxtLink>
            <NuxtLink 
              @click="isMenuOpen = false" 
              to="/register" 
              class="flex-1 bg-primary hover:bg-primary/90 py-3.5 px-4 text-center rounded-lg font-medium text-white transition-all duration-300 shadow-sm hover:shadow"
            >
              Daftar
            </NuxtLink>
          </div>
          
          <!-- Show dashboard button if authenticated -->
          <div v-else>
            <NuxtLink 
              @click="isMenuOpen = false" 
              to="/dashboard" 
              class="w-full bg-primary hover:bg-primary/90 py-3.5 px-4 text-center rounded-lg font-medium text-white transition-all duration-300 shadow-sm hover:shadow flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </NuxtLink>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, defineComponent, h } from 'vue';

const isMenuOpen = ref(false);
const isAuthenticated = ref(false);

const navItems = [
  { label: 'Beranda', path: '/' },
  { label: 'Gunung', path: '/mountain/status' },
  { label: 'Forum', path: '/forum' },
  { label: 'Panduan', path: '/guide' }
];

const mobileNavItems = [
  { 
    label: 'Beranda', 
    path: '/', 
    icon: 'svg',
  },
  { 
    label: 'Gunung', 
    path: '/mountain/status', 
    icon: 'svg',
  },
  { 
    label: 'Forum', 
    path: '/forum', 
    icon: 'svg',
  },
  { 
    label: 'Panduan', 
    path: '/guide', 
    icon: 'svg',
  },
  { 
    label: 'Tentang', 
    path: '/about', 
    icon: 'svg',
  }
];

// Check authentication status on component mount
onMounted(() => {
  checkAuthStatus();
});

// Function to check if user is authenticated
const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  isAuthenticated.value = !!token;
};

const svg = defineComponent({
  props: ['class'],
  setup(props) {
    return () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      class: props.class,
      fill: 'none',
      viewBox: '0 0 24 24',
      stroke: 'currentColor',
      'stroke-width': '2'
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'd': 'M5 12h14M12 5l7 7-7 7'
      })
    ])
  }
});
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

.backdrop-blur-md {
  backdrop-filter: blur(12px);
}

@media (max-width: 768px) {
  .text-primary {
    color: #0284c7 !important;
  }
}
</style>