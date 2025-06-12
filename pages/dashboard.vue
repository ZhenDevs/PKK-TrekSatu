<template>
  <div class="min-h-screen bg-gray-50">
    <div class="lg:hidden fixed top-4 left-4 z-50">
      <button @click="isSidebarOpen = !isSidebarOpen"
        class="p-2 rounded-lg bg-white shadow-md text-gray-600 hover:text-primary transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="isSidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <aside
      class="fixed inset-y-0 left-0 bg-white shadow-lg lg:shadow-none z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'">
      <div class="h-full flex flex-col">
        <div class="flex items-center justify-center h-16 px-6 border-b">
          <h1 class="text-2xl font-bold text-gray-900">Trek<span class="text-primary">Satu</span></h1>
        </div>

        <nav class="flex-1 pt-5 pb-4 overflow-y-auto">
          <div class="px-4 mb-6">
            <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</span>
          </div>
          <ul>
            <li>
              <a href="#" class="flex items-center px-6 py-3 text-primary bg-blue-50 border-r-4 border-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="/mountain/status"
                class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Status Gunung
              </a>
            </li>
            <li>
              <a href="/forum"
                class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                Forum
              </a>
            </li>
          </ul>

          <div v-if="isAdmin" class="px-4 mt-8 mb-6">
            <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</span>
          </div>
          <ul v-if="isAdmin">
            <li>
              <a href="/mountain"
                class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Kelola Gunung
              </a>
            </li>
            <li>
              <a href="/users"
                class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Kelola Pengguna
              </a>
            </li>
          </ul>
        </nav>

        <div class="border-t p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                {{ userInitials }}
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-800">{{ userName }}</p>
              <button @click="logout" class="text-xs text-gray-500 hover:text-primary transition-colors">
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <div class="lg:pl-64">
      <header class="bg-white shadow-sm z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16 items-center">

            <div class="flex-1 max-w-md ml-auto mr-0 hidden md:block relative">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input type="text" v-model="searchQuery" @focus="showSearchResults = true" @keyup="handleSearch"
                  placeholder="Cari gunung atau forum..."
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary text-sm">
              </div>

              <div
                v-if="showSearchResults && searchQuery && (filteredMountains.length > 0 || filteredForumPosts.length > 0)"
                class="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
                v-click-outside="() => showSearchResults = false">
                <div v-if="filteredMountains.length > 0" class="p-3">
                  <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Gunung</h3>
                  <ul class="divide-y divide-gray-100">
                    <li v-for="mountain in filteredMountains.slice(0, 3)" :key="mountain.id" class="py-2">
                      <a @click.prevent="goToMountainDetails(mountain.id)" href="#"
                        class="flex items-center hover:bg-gray-50 p-2 rounded-lg">
                        <div class="flex-shrink-0 h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <img v-if="mountain.photoUrl" :src="`${apiBaseUrl}${mountain.photoUrl}`"
                            class="h-10 w-10 object-cover rounded-lg" alt="Foto Gunung" />
                          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                          </svg>
                        </div>
                        <div class="ml-3">
                          <p class="text-sm font-medium text-gray-900 line-clamp-1">{{ mountain.name }}</p>
                          <p class="text-xs text-gray-500 line-clamp-1">{{ mountain.location }} - {{
                            formatStatusBadge(mountain.status) }}</p>
                        </div>
                      </a>
                    </li>
                    <li v-if="filteredMountains.length > 3" class="py-2">
                      <a @click.prevent="viewAllSearchResults('mountains')" href="#"
                        class="block text-center text-sm text-primary hover:text-primary-dark py-1">
                        Lihat semua {{ filteredMountains.length }} gunung
                      </a>
                    </li>
                  </ul>
                </div>

                <div v-if="filteredForumPosts.length > 0" class="p-3"
                  :class="{ 'border-t border-gray-100': filteredMountains.length > 0 }">
                  <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Forum</h3>
                  <ul class="divide-y divide-gray-100">
                    <li v-for="post in filteredForumPosts.slice(0, 3)" :key="post.id" class="py-2">
                      <a @click.prevent="goToForumPost(post.id)" href="#"
                        class="flex items-start hover:bg-gray-50 p-2 rounded-lg">
                        <div
                          class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                          {{ getInitials(post.author?.name || 'Anonym') }}
                        </div>
                        <div class="ml-3">
                          <p class="text-sm font-medium text-gray-900 line-clamp-1">{{ post.title }}</p>
                          <p class="text-xs text-gray-500 line-clamp-1">{{ truncateText(post.content, 50) }}</p>
                        </div>
                      </a>
                    </li>
                    <li v-if="filteredForumPosts.length > 3" class="py-2">
                      <a @click.prevent="viewAllSearchResults('forum')" href="#"
                        class="block text-center text-sm text-primary hover:text-primary-dark py-1">
                        Lihat semua {{ filteredForumPosts.length }} diskusi
                      </a>
                    </li>
                  </ul>
                </div>

                <div v-if="searchQuery && filteredMountains.length === 0 && filteredForumPosts.length === 0"
                  class="p-4 text-center text-gray-500">
                  Tidak ada hasil untuk "{{ searchQuery }}"
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white overflow-hidden shadow-sm rounded-lg">
              <div class="p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-blue-50 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Total Gunung
                      </dt>
                      <dd class="flex items-baseline">
                        <div class="text-2xl font-semibold text-gray-900">
                          {{ mountains.length }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow-sm rounded-lg">
              <div class="p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-green-50 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Gunung Dapat Didaki
                      </dt>
                      <dd class="flex items-baseline">
                        <div class="text-2xl font-semibold text-gray-900">
                          {{ openMountains.length }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white overflow-hidden shadow-sm rounded-lg">
              <div class="p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0 bg-red-50 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <dl>
                      <dt class="text-sm font-medium text-gray-500 truncate">
                        Gunung Berstatus Waspada
                      </dt>
                      <dd class="flex items-baseline">
                        <div class="text-2xl font-semibold text-gray-900">
                          {{ cautionMountains.length }}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 bg-white shadow-sm rounded-lg overflow-hidden">
              <div class="px-6 py-5 border-b border-gray-100">
                <h3 class="text-lg font-medium text-gray-900">Status Gunung Terbaru</h3>
                <p class="mt-1 text-sm text-gray-500">Update status terbaru gunung-gunung Indonesia</p>
              </div>
              <div class="p-6">
                <div v-if="loading" class="py-10 text-center">
                  <svg class="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                </div>
                <div v-else-if="error" class="py-10 text-center text-red-500">
                  {{ error }}
                </div>
                <div v-else class="flow-root">
                  <ul v-if="mountains.length" class="-my-5 divide-y divide-gray-100">
                    <li v-for="mountain in mountains.slice(0, 5)" :key="mountain.id" class="py-4">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <img v-if="mountain.photoUrl" :src="`${apiBaseUrl}${mountain.photoUrl}`"
                            class="h-12 w-12 object-cover" alt="Foto Gunung" />
                          <div v-else class="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                              viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                            </svg>
                          </div>
                        </div>
                        <div class="ml-4 flex-1">
                          <div class="flex items-center justify-between">
                            <p class="text-sm font-medium text-gray-900">{{ mountain.name }}</p>
                            <p class="text-sm font-medium" :class="{
                              'text-green-600': mountain.status === 'buka',
                              'text-yellow-600': mountain.status === 'waspada',
                              'text-red-600': mountain.status === 'tutup'
                            }">
                              {{ mountain.status.charAt(0).toUpperCase() + mountain.status.slice(1) }}
                            </p>
                          </div>
                          <div class="mt-1 flex items-center">
                            <p class="text-sm text-gray-500">{{ mountain.location }} - {{ mountain.height }} m</p>
                            <span class="ml-1 text-gray-300">•</span>
                            <p class="ml-1 text-xs text-gray-500">
                              Update {{ formatDate(mountain.updatedAt) }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div v-else class="py-10 text-center text-gray-500">
                    Belum ada data gunung
                  </div>
                </div>
                <div class="mt-6">
                  <a href="/mountain/status"
                    class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Lihat Semua
                  </a>
                </div>
              </div>
            </div>

            <div class="bg-white shadow-sm rounded-lg overflow-hidden">
              <div class="px-6 py-5 border-b border-gray-100">
                <h3 class="text-lg font-medium text-gray-900">Aktivitas Forum Terbaru</h3>
                <p class="mt-1 text-sm text-gray-500">Diskusi dan informasi terbaru</p>
              </div>
              <div class="p-6">
                <div v-if="loading" class="py-10 text-center">
                  <svg class="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                </div>
                <div v-else-if="error" class="py-10 text-center text-red-500">
                  {{ error }}
                </div>
                <div v-else class="flow-root">
                  <ul v-if="forumPosts.length" class="-my-5 divide-y divide-gray-100">
                    <li v-for="post in forumPosts.slice(0, 3)" :key="post.id" class="py-4">
                      <div class="flex">
                        <div class="flex-shrink-0">
                          <div
                            class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                            {{ getInitials(post.author?.name || 'Anonymous') }}
                          </div>
                        </div>
                        <div class="ml-3 flex-1">
                          <p class="text-sm font-medium text-gray-900">{{ post.author?.name || 'Anonymous' }}</p>
                          <p class="mt-1 text-sm text-gray-500">
                            Membuat post <a href="#"
                              class="font-medium text-primary hover:text-primary/80 transition-colors">{{ post.title
                              }}</a>
                          </p>
                          <p class="mt-1 text-xs text-gray-500">{{ formatDate(post.createdAt) }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div v-else class="py-10 text-center text-gray-500">
                    Belum ada postingan forum
                  </div>
                </div>
                <div class="mt-6">
                  <a href="/forum"
                    class="w-full flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Lihat Semua
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <MountainList v-if="isAdmin" ref="mountainList" :apiBaseUrl="apiBaseUrl" @mountainsUpdated="updateMountains" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'dashboard',
});

const router = useRouter();
const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const mountainList = ref(null);

const updateMountains = (updatedMountains) => {
  mountains.value = updatedMountains;
};

const isSidebarOpen = ref(false);
const userName = ref('');
const isAdmin = ref(false);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const showSearchResults = ref(false);
const searchDebounceTimeout = ref(null);

const mountains = ref([]);
const forumPosts = ref([]);

const openMountains = computed(() => mountains.value.filter(m => m.status === 'buka'));
const cautionMountains = computed(() => mountains.value.filter(m => m.status === 'waspada'));
const closedMountains = computed(() => mountains.value.filter(m => m.status === 'tutup'));

const userInitials = computed(() => {
  if (!userName.value) return '';
  return getInitials(userName.value);
});

const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date';

  const date = new Date(dateString);
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
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
};

const fetchMountains = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/mountains`);
    if (!response.ok) throw new Error('Failed to fetch mountains');

    const data = await response.json();
    mountains.value = data;
  } catch (err) {
    console.error('Error fetching mountains:', err);
    error.value = 'Gagal memuat data gunung. Silakan coba lagi nanti.';
  }
};

const fetchForumPosts = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/forum`);
    if (!response.ok) throw new Error('Failed to fetch forum posts');

    const data = await response.json();
    forumPosts.value = data;
  } catch (err) {
    console.error('Error fetching forum posts:', err);
    error.value = 'Gagal memuat data forum. Silakan coba lagi nanti.';
  }
};

onMounted(async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    router.push('/login');
    return;
  }

  try {
    loading.value = true;
    error.value = null;

    const userResponse = await fetch(`${apiBaseUrl}/api/auth/me`, {
      headers: {
        'x-auth-token': token
      }
    });

    if (!userResponse.ok) {
      throw new Error('Not authenticated');
    }

    const userData = await userResponse.json();
    userName.value = userData.name;
    isAdmin.value = userData.role === 'admin';

    await Promise.all([
      fetchMountains(),
      fetchForumPosts()
    ]);

  } catch (err) {
    console.error('Authentication error:', err);
    error.value = 'Error: ' + err.message;
    localStorage.removeItem('token');
    router.push('/login');
  } finally {
    loading.value = false;
  }
});

const filteredMountains = computed(() => {
  if (!searchQuery.value) return [];

  const query = searchQuery.value.toLowerCase();
  return mountains.value.filter(mountain =>
    mountain.name.toLowerCase().includes(query) ||
    mountain.location.toLowerCase().includes(query) ||
    mountain.description?.toLowerCase().includes(query)
  );
});

const filteredForumPosts = computed(() => {
  if (!searchQuery.value) return [];

  const query = searchQuery.value.toLowerCase();
  return forumPosts.value.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.content.toLowerCase().includes(query)
  );
});

const handleSearch = () => {
  if (searchDebounceTimeout.value) {
    clearTimeout(searchDebounceTimeout.value);
  }

  searchDebounceTimeout.value = setTimeout(() => {
    showSearchResults.value = searchQuery.value.length > 0;
  }, 300);
};

const goToMountainDetails = (id) => {
  router.push(`/mountain/status?id=${id}`);
  showSearchResults.value = false;
};

const goToForumPost = (id) => {
  router.push(`/forum?id=${id}`);
  showSearchResults.value = false;
};

const viewAllSearchResults = (type) => {
  if (type === 'mountains') {
    router.push({
      path: '/mountain/status',
      query: { search: searchQuery.value }
    });
  } else if (type === 'forum') {
    router.push({
      path: '/forum',
      query: { search: searchQuery.value }
    });
  }
  showSearchResults.value = false;
};

const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const formatStatusBadge = (status) => {
  if (status === 'buka') return 'Buka';
  if (status === 'waspada') return 'Waspada';
  if (status === 'tutup') return 'Tutup';
  return status;
};

const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      if (el !== event.target && !el.contains(event.target)) {
        binding.value(event);
      }
    };
    document.addEventListener('click', el._clickOutside);
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside);
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
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