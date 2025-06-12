<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
        <h1 class="text-3xl font-semibold text-gray-900">Status Gunung</h1>
        <div class="flex space-x-3">
          <button 
            @click="router.push('/dashboard')" 
            class="bg-white hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-5 rounded-lg shadow-sm border border-gray-200 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali
          </button>
        </div>
      </div>

      <div class="bg-white shadow-sm rounded-xl p-5 mb-8 border border-gray-100">
        <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div class="relative flex-1 mb-4 md:mb-0">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari nama gunung atau lokasi..."
              class="pl-10 pr-4 py-3 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @input="resetPagination"
            />
          </div>
          <div class="flex space-x-2">
            <select
              v-model="statusFilter"
              class="border border-gray-200 rounded-lg px-3 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              @change="resetPagination"
            >
              <option value="all">Semua Status</option>
              <option value="buka">Buka</option>
              <option value="waspada">Waspada</option>
              <option value="tutup">Tutup</option>
            </select>
            <button
              @click="resetFilters"
              class="px-4 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div v-if="loading" class="bg-white shadow-md rounded-xl p-12 flex justify-center items-center border border-gray-100 min-h-[400px]">
        <div class="flex flex-col items-center space-y-4">
          <div class="animate-spin h-8 w-8 border-3 border-blue-500 rounded-full border-t-transparent"></div>
          <span class="text-gray-500 font-medium">Memuat data gunung...</span>
        </div>
      </div>

      <div v-else-if="error" class="bg-white shadow-md rounded-xl p-12 text-center border border-gray-100 min-h-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 class="mt-6 text-xl font-medium text-gray-900">Terjadi Kesalahan</h3>
        <p class="mt-2 text-red-500">{{ error }}</p>
        <button 
          @click="fetchMountains" 
          class="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors"
        >
          Coba Lagi
        </button>
      </div>

      <div v-else-if="filteredMountains.length === 0" class="bg-white shadow-md rounded-xl p-16 text-center border border-gray-100 min-h-[400px]">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
        </svg>
        <h3 class="mt-6 text-xl font-medium text-gray-900">Tidak ada gunung ditemukan</h3>
        <p class="mt-2 text-gray-500 max-w-md mx-auto">
          {{ searchQuery || statusFilter !== 'all' ? 'Coba ubah filter pencarian Anda untuk menemukan data yang Anda cari.' : 'Belum ada data gunung yang tersedia dalam sistem.' }}
        </p>
      </div>

      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div v-for="mountain in paginatedMountains" :key="mountain.id" 
               class="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all hover:shadow-lg">
            <div class="h-48 overflow-hidden relative">
              <img 
                v-if="mountain.photoUrl" 
                :src="`${apiBaseUrl}${mountain.photoUrl}`" 
                class="w-full h-full object-cover"
                alt="Foto Gunung"
              />
              <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                </svg>
              </div>
              <div class="absolute top-3 right-3">
                <span :class="{
                  'px-3 py-1 text-xs font-medium rounded-full shadow-sm': true,
                  'bg-green-50 text-green-700 border border-green-200': mountain.status === 'buka',
                  'bg-yellow-50 text-yellow-700 border border-yellow-200': mountain.status === 'waspada',
                  'bg-red-50 text-red-700 border border-red-200': mountain.status === 'tutup'
                }">
                  {{ mountain.status.charAt(0).toUpperCase() + mountain.status.slice(1) }}
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ mountain.name }}</h3>
              
              <div class="text-gray-600 mb-4 space-y-1.5">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-sm">{{ mountain.location }}</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span class="text-sm">{{ mountain.height }} m</span>
                </div>
              </div>
              
              <p class="text-gray-600 text-sm line-clamp-3 mb-4">{{ mountain.description }}</p>
              
              <div class="flex justify-between items-center pt-2 border-t border-gray-100">
                <span class="text-xs text-gray-400">{{ formatDate(mountain.updatedAt) }}</span>
                <button 
                  @click="viewMountainDetails(mountain)" 
                  class="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-between items-center bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div class="text-sm text-gray-500">
            Menampilkan {{ startIndex + 1 }}-{{ Math.min(endIndex, filteredMountains.length) }} dari {{ filteredMountains.length }} gunung
          </div>
          
          <div class="flex space-x-2">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              :class="[
                'px-4 py-2 rounded-lg border text-sm font-medium',
                currentPage === 1 
                  ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              ]"
            >
              Sebelumnya
            </button>
            
            <div class="hidden md:flex space-x-2">
              <button
                v-for="page in displayedPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'w-10 h-10 rounded-lg text-sm flex items-center justify-center font-medium',
                  currentPage === page
                    ? 'bg-blue-600 text-white border border-blue-600'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages"
              :class="[
                'px-4 py-2 rounded-lg border text-sm font-medium',
                currentPage === totalPages 
                  ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              ]"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showDetailModal" class="fixed inset-0 z-[1000] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity bg-gray-500/70 backdrop-blur-sm" aria-hidden="true" @click="showDetailModal = false"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div v-if="selectedMountain" class="relative inline-block overflow-hidden text-left align-bottom bg-white rounded-xl shadow-xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div class="h-64 overflow-hidden">
            <img 
              v-if="selectedMountain.photoUrl" 
              :src="`${apiBaseUrl}${selectedMountain.photoUrl}`" 
              class="w-full h-full object-cover"
              alt="Foto Gunung"
            />
            <div v-else class="w-full h-full bg-gray-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
              </svg>
            </div>
          </div>
          
          <div class="px-6 py-5">
            <div class="flex justify-between items-start mb-5">
              <h3 class="text-2xl font-bold text-gray-900">{{ selectedMountain.name }}</h3>
              <span :class="{
                'px-3 py-1 text-sm font-medium rounded-full shadow-sm': true,
                'bg-green-50 text-green-700 border border-green-200': selectedMountain.status === 'buka',
                'bg-yellow-50 text-yellow-700 border border-yellow-200': selectedMountain.status === 'waspada',
                'bg-red-50 text-red-700 border border-red-200': selectedMountain.status === 'tutup'
              }">
                {{ selectedMountain.status.charAt(0).toUpperCase() + selectedMountain.status.slice(1) }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-6 mb-5">
              <div>
                <p class="text-sm text-gray-500 mb-1">Lokasi</p>
                <p class="font-medium text-gray-900">{{ selectedMountain.location }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Ketinggian</p>
                <p class="font-medium text-gray-900">{{ selectedMountain.height }} m</p>
              </div>
            </div>
            
            <div class="mb-5">
              <p class="text-sm text-gray-500 mb-2">Deskripsi</p>
              <p class="text-gray-700 leading-relaxed">{{ selectedMountain.description }}</p>
            </div>
            
            <div class="text-right text-xs text-gray-400">
              Terakhir diperbarui: {{ formatDate(selectedMountain.updatedAt, true) }}
            </div>
          </div>
          
          <div class="px-6 py-4 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
            <button type="button" @click="showDetailModal = false" class="inline-flex justify-center w-full px-4 py-2.5 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'dashboard',
});

const router = useRouter();
const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const mountains = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const statusFilter = ref('all');
const currentPage = ref(1);
const itemsPerPage = ref(9);
const showDetailModal = ref(false);
const selectedMountain = ref(null);

const filteredMountains = computed(() => {
  let result = [...mountains.value];
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(mountain => 
      mountain.name.toLowerCase().includes(query) || 
      mountain.location.toLowerCase().includes(query)
    );
  }
  
  if (statusFilter.value !== 'all') {
    result = result.filter(mountain => mountain.status === statusFilter.value);
  }
  
  return result;
});

const totalPages = computed(() => {
  return Math.ceil(filteredMountains.value.length / itemsPerPage.value);
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value;
});

const endIndex = computed(() => {
  return startIndex.value + itemsPerPage.value;
});

const paginatedMountains = computed(() => {
  return filteredMountains.value.slice(startIndex.value, endIndex.value);
});

const displayedPages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  
  if (totalPages.value <= maxPagesToShow) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    
    let startPage = Math.max(2, currentPage.value - 1);
    let endPage = Math.min(totalPages.value - 1, currentPage.value + 1);
    
    if (currentPage.value <= 3) {
      endPage = Math.min(totalPages.value - 1, 4);
    } else if (currentPage.value >= totalPages.value - 2) {
      startPage = Math.max(2, totalPages.value - 3);
    }
    
    if (startPage > 2) {
      pages.push('...');
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    if (endPage < totalPages.value - 1) {
      pages.push('...');
    }
    
    pages.push(totalPages.value);
  }
  
  return pages;
});

const fetchMountains = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(`${apiBaseUrl}/api/mountains`);
    
    if (!response.ok) throw new Error('Failed to fetch mountains');
    
    const data = await response.json();
    mountains.value = data;
  } catch (err) {
    console.error('Error fetching mountains:', err);
    error.value = 'Gagal memuat data gunung. Silakan coba lagi nanti.';
  } finally {
    loading.value = false;
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  statusFilter.value = 'all';
  resetPagination();
};

const resetPagination = () => {
  currentPage.value = 1;
};

const viewMountainDetails = (mountain) => {
  selectedMountain.value = mountain;
  showDetailModal.value = true;
};

const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  
  if (includeTime) {
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) {
    return `${diffSec} detik yang lalu`;
  } else if (diffMin < 60) {
    return `${diffMin} menit yang lalu`;
  } else if (diffHour < 24) {
    return `${diffHour} jam yang lalu`;
  } else if (diffDay < 7) {
    return `${diffDay} hari yang lalu`;
  } else {
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
};

onMounted(async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    router.push('/login');
    return;
  }
  
  await fetchMountains();
});
</script>

<style scoped>
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.relative {
  position: relative;
  z-index: 1;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>