<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Top Header with Navigation -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 class="text-3xl font-semibold text-gray-900">Forum Diskusi</h1>
        <div class="flex space-x-3 mt-4 md:mt-0">
          <button 
            @click="router.push('/dashboard')" 
            class="bg-white hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-5 rounded-lg shadow-sm border border-gray-200 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali
          </button>
          <button 
            v-if="isAuthenticated"
            @click="openNewTopicModal" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Buat Topik Baru
          </button>
        </div>
      </div>

      <!-- Forum Topic List / Chat View Container -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Topic List (1/3 width on large screens, full on mobile) -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div class="p-4 bg-gray-50 border-b border-gray-100">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari topik..."
                class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div v-if="loading" class="p-6 text-center">
            <div class="inline-block animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
            <p class="mt-2 text-gray-500">Memuat topik...</p>
          </div>

          <div v-else class="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
            <div 
              v-for="topic in filteredTopics" 
              :key="topic.id" 
              @click="selectTopic(topic)"
              class="p-4 hover:bg-blue-50 cursor-pointer transition-colors"
              :class="{'bg-blue-50': selectedTopic && selectedTopic.id === topic.id}"
            >
              <div class="flex items-start">
                <div class="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-white font-medium"
                  :class="getRandomColorClass(topic.author?.name || 'Anonym')">
                  {{ getInitials(topic.author?.name || 'Anonym') }}
                </div>
                <div class="ml-3 flex-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium text-gray-900">{{ topic.title }}</h3>
                    <span class="text-xs text-gray-500">{{ formatDate(topic.createdAt) }}</span>
                  </div>
                  <p class="text-sm text-gray-500 line-clamp-1">{{ topic.content }}</p>
                  <div class="flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span class="ml-1 text-xs text-gray-500">{{ topic.ForumComments?.length || 0 }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="filteredTopics.length === 0" class="p-6 text-center">
              <p class="text-gray-500">Tidak ada topik yang ditemukan</p>
            </div>
          </div>
        </div>

        <!-- Chat View (2/3 width on large screens, full on mobile) -->
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 lg:col-span-2 flex flex-col">
          <div v-if="!selectedTopic" class="flex-1 flex items-center justify-center p-8">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 class="mt-4 text-xl font-medium text-gray-900">Pilih topik diskusi</h3>
              <p class="mt-2 text-gray-500">Klik pada salah satu topik di sebelah kiri untuk mulai berdiskusi</p>
            </div>
          </div>

          <template v-else>
            <!-- Chat Header -->
            <div class="p-4 bg-gray-800 text-white flex items-center justify-between">
              <div class="flex items-center">
                <h2 class="text-lg font-medium">{{ selectedTopic.title }}</h2>
              </div>
              <div class="flex space-x-2">
                <button 
                  v-if="canEditTopic(selectedTopic)"
                  @click="editTopic(selectedTopic)" 
                  class="p-1 rounded-full hover:bg-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button 
                  v-if="canDeleteTopic(selectedTopic)"
                  @click="confirmDeleteTopic(selectedTopic)" 
                  class="p-1 rounded-full hover:bg-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Chat Messages -->
            <div class="flex-1 p-4 overflow-y-auto max-h-[400px]" ref="chatMessages">
              <!-- First message is the topic itself -->
              <div class="flex items-start mb-5">
                <div class="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-white font-medium"
                  :class="getRandomColorClass(selectedTopic.author?.name || 'Anonym')">
                  {{ getInitials(selectedTopic.author?.name || 'Anonym') }}
                </div>
                <div class="ml-3 bg-gray-50 p-3 rounded-lg max-w-[80%]">
                  <div class="flex items-center">
                    <span class="text-sm font-medium text-gray-900">{{ selectedTopic.author?.name || 'Anonym' }}</span>
                    <span class="ml-2 text-xs text-gray-500">{{ formatDate(selectedTopic.createdAt, true) }}</span>
                  </div>
                  <p class="text-sm text-gray-700 whitespace-pre-line">{{ selectedTopic.content }}</p>
                </div>
              </div>

              <!-- Comments as chat messages -->
              <div v-for="comment in selectedTopic.ForumComments" :key="comment.id" class="flex items-start mb-4">
                <template v-if="comment.authorId === currentUser?.id">
                  <div class="ml-auto flex items-start">
                    <div class="mr-3 bg-blue-100 p-3 rounded-lg max-w-[80%]">
                      <div class="flex items-center justify-end">
                        <span class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                        <span class="ml-2 text-sm font-medium text-gray-900">Anda</span>
                      </div>
                      <p class="text-sm text-gray-700 whitespace-pre-line text-right">{{ comment.content }}</p>
                    </div>
                    <div class="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-blue-600 text-white font-medium">
                      {{ getInitials(currentUser?.name || 'ME') }}
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-white font-medium"
                    :class="getRandomColorClass(comment.author?.name || 'Anonym')">
                    {{ getInitials(comment.author?.name || 'Anonym') }}
                  </div>
                  <div class="ml-3 bg-gray-50 p-3 rounded-lg max-w-[80%]">
                    <div class="flex items-center">
                      <span class="text-sm font-medium text-gray-900">{{ comment.author?.name || 'Anonym' }}</span>
                      <span class="ml-2 text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</span>
                    </div>
                    <p class="text-sm text-gray-700 whitespace-pre-line">{{ comment.content }}</p>
                  </div>
                </template>
              </div>
            </div>

            <!-- Chat Input -->
            <div class="p-4 border-t border-gray-100">
              <form @submit.prevent="sendMessage" class="flex">
                <input
                  v-model="messageInput"
                  type="text"
                  placeholder="Ketik pesan..."
                  class="flex-1 px-4 py-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :disabled="!isAuthenticated"
                />
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :disabled="!isAuthenticated || !messageInput.trim()"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
              <div v-if="!isAuthenticated" class="text-center mt-2 text-sm text-gray-500">
                <a href="/login" class="text-blue-600 hover:underline">Masuk</a> untuk bergabung dalam diskusi
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- New Topic Modal -->
    <div v-if="showTopicFormModal" class="fixed inset-0 z-[1000] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity bg-gray-500/70 backdrop-blur-sm" aria-hidden="true" @click="showTopicFormModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div class="relative inline-block overflow-hidden text-left align-bottom bg-white rounded-xl shadow-xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div class="px-6 py-5">
            <h3 class="text-xl font-bold text-gray-900 mb-4">
              {{ editingTopic ? 'Edit Topik' : 'Buat Topik Baru' }}
            </h3>
            
            <form @submit.prevent="saveTopic">
              <div class="space-y-4">
                <div>
                  <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                  <input
                    id="title"
                    v-model="topicForm.title"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Judul topik diskusi"
                    required
                  />
                </div>
                
                <div>
                  <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Konten</label>
                  <textarea
                    id="content"
                    v-model="topicForm.content"
                    rows="6"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Isi topik diskusi"
                    required
                  ></textarea>
                </div>
              </div>
              
              <div class="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  @click="showTopicFormModal = false"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {{ editingTopic ? 'Simpan Perubahan' : 'Buat Topik' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirmModal" class="fixed inset-0 z-[1000] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity bg-gray-500/70 backdrop-blur-sm" aria-hidden="true" @click="showDeleteConfirmModal = false"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div class="relative inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Hapus Topik
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Apakah Anda yakin ingin menghapus topik ini? Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="deleteTopic" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
              Hapus
            </button>
            <button type="button" @click="showDeleteConfirmModal = false" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'dashboard',
});

const router = useRouter();
const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// State variables
const topics = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const selectedTopic = ref(null);
const currentUser = ref(null);
const isAuthenticated = ref(false);
const messageInput = ref('');
const chatMessages = ref(null);

// Modals
const showTopicFormModal = ref(false);
const showDeleteConfirmModal = ref(false);
const editingTopic = ref(false);
const topicToDelete = ref(null);

// Forms
const topicForm = ref({
  title: '',
  content: ''
});

// Polling interval for real-time updates
const pollInterval = ref(null);
const POLL_INTERVAL_MS = 5000; // Poll every 5 seconds

// Filtered topics based on search
const filteredTopics = computed(() => {
  if (!searchQuery.value) return topics.value;
  
  const query = searchQuery.value.toLowerCase();
  return topics.value.filter(topic => 
    topic.title.toLowerCase().includes(query) || 
    topic.content.toLowerCase().includes(query)
  );
});

// Color classes for user avatars (stable colors per user name)
const colorClasses = [
  'bg-blue-600',
  'bg-green-600',
  'bg-yellow-600',
  'bg-red-600',
  'bg-purple-600',
  'bg-pink-600',
  'bg-indigo-600',
  'bg-gray-600',
  'bg-teal-600'
];

const getRandomColorClass = (name) => {
  // Generate a deterministic index based on the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  // Use absolute value and modulo to get a positive index within array bounds
  const index = Math.abs(hash) % colorClasses.length;
  return colorClasses[index];
};

// Permission checks
const canEditTopic = (topic) => {
  if (!isAuthenticated.value || !currentUser.value) return false;
  return currentUser.value.id === topic.authorId || currentUser.value.role === 'admin';
};

const canDeleteTopic = (topic) => {
  if (!isAuthenticated.value || !currentUser.value) return false;
  return currentUser.value.id === topic.authorId || currentUser.value.role === 'admin';
};

// Methods
const fetchTopics = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${apiBaseUrl}/api/forum`);
    
    if (!response.ok) throw new Error('Failed to fetch topics');
    
    const data = await response.json();
    topics.value = data;
    
    // If we have a selectedTopic, refresh its data
    if (selectedTopic.value) {
      const updatedTopic = data.find(topic => topic.id === selectedTopic.value.id);
      if (updatedTopic) {
        selectedTopic.value = updatedTopic;
      }
    }
  } catch (err) {
    console.error('Error fetching topics:', err);
    error.value = 'Gagal memuat data forum. Silakan coba lagi nanti.';
  } finally {
    loading.value = false;
  }
};

const fetchCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    isAuthenticated.value = false;
    currentUser.value = null;
    return;
  }
  
  try {
    const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
      headers: {
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      throw new Error('Not authenticated');
    }
    
    currentUser.value = await response.json();
    isAuthenticated.value = true;
  } catch (err) {
    console.error('Authentication error:', err);
    isAuthenticated.value = false;
    currentUser.value = null;
  }
};

const selectTopic = async (topic) => {
  try {
    // Fetch the complete topic with all comments
    const response = await fetch(`${apiBaseUrl}/api/forum/${topic.id}`);
    
    if (!response.ok) throw new Error('Failed to fetch topic details');
    
    selectedTopic.value = await response.json();
    messageInput.value = ''; // Clear message input
    
    // Scroll to bottom of messages on next tick
    await nextTick();
    scrollToBottom();
  } catch (err) {
    console.error('Error fetching topic details:', err);
    alert('Gagal memuat detail diskusi. Silakan coba lagi.');
  }
};

const scrollToBottom = () => {
  if (chatMessages.value) {
    chatMessages.value.scrollTop = chatMessages.value.scrollHeight;
  }
};

const openNewTopicModal = () => {
  editingTopic.value = false;
  topicForm.value = {
    title: '',
    content: ''
  };
  showTopicFormModal.value = true;
};

const editTopic = (topic) => {
  editingTopic.value = true;
  topicForm.value = {
    id: topic.id,
    title: topic.title,
    content: topic.content
  };
  showTopicFormModal.value = true;
};

const confirmDeleteTopic = (topic) => {
  topicToDelete.value = topic;
  showDeleteConfirmModal.value = true;
};

const saveTopic = async () => {
  if (!isAuthenticated.value) {
    alert('Anda harus login untuk membuat atau mengedit topik.');
    return;
  }
  
  try {
    const token = localStorage.getItem('token');
    const url = editingTopic.value ? `${apiBaseUrl}/api/forum/${topicForm.value.id}` : `${apiBaseUrl}/api/forum`;
    const method = editingTopic.value ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify({
        title: topicForm.value.title,
        content: topicForm.value.content
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save topic');
    }
    
    const savedTopic = await response.json();
    
    // Refresh topics list
    await fetchTopics();
    showTopicFormModal.value = false;
    
    // If we created a new topic, select it
    if (!editingTopic.value) {
      selectTopic(savedTopic);
    }
  } catch (err) {
    console.error('Error saving topic:', err);
    alert(err.message || 'Gagal menyimpan topik. Silakan coba lagi nanti.');
  }
};

const deleteTopic = async () => {
  if (!topicToDelete.value) return;
  
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${apiBaseUrl}/api/forum/${topicToDelete.value.id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete topic');
    }
    
    // If the deleted topic was selected, clear the selection
    if (selectedTopic.value && selectedTopic.value.id === topicToDelete.value.id) {
      selectedTopic.value = null;
    }
    
    // Refresh topics list
    await fetchTopics();
    showDeleteConfirmModal.value = false;
  } catch (err) {
    console.error('Error deleting topic:', err);
    alert(err.message || 'Gagal menghapus topik. Silakan coba lagi nanti.');
  }
};

const sendMessage = async () => {
  if (!isAuthenticated.value || !selectedTopic.value || !messageInput.value.trim()) {
    return;
  }
  
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${apiBaseUrl}/api/forum/${selectedTopic.value.id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify({
        content: messageInput.value
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send message');
    }
    
    // Update the selected topic with the new message
    selectedTopic.value = await response.json();
    
    // Clear message input
    messageInput.value = '';
    
    // Scroll to bottom of messages on next tick
    await nextTick();
    scrollToBottom();
    
    // Refresh topics list in the background to update comment counts
    fetchTopics();
  } catch (err) {
    console.error('Error sending message:', err);
    alert(err.message || 'Gagal mengirim pesan. Silakan coba lagi nanti.');
  }
};

const startPolling = () => {
  // Clear any existing interval
  if (pollInterval.value) {
    clearInterval(pollInterval.value);
  }
  
  // Set up polling for real-time updates
  pollInterval.value = setInterval(async () => {
    if (selectedTopic.value) {
      try {
        const response = await fetch(`${apiBaseUrl}/api/forum/${selectedTopic.value.id}`);
        
        if (response.ok) {
          const updatedTopic = await response.json();
          // Only update if there are new messages
          if (updatedTopic.ForumComments.length !== selectedTopic.value.ForumComments.length) {
            selectedTopic.value = updatedTopic;
            await nextTick();
            scrollToBottom();
          }
        }
      } catch (err) {
        console.error('Error polling for updates:', err);
      }
    }
    
    // Also refresh the topic list occasionally
    fetchTopics();
  }, POLL_INTERVAL_MS);
};

const stopPolling = () => {
  if (pollInterval.value) {
    clearInterval(pollInterval.value);
    pollInterval.value = null;
  }
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

const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Watch for changes to selectedTopic to scroll to bottom
watch(selectedTopic, () => {
  nextTick(() => {
    scrollToBottom();
  });
});

onMounted(async () => {
  await fetchCurrentUser();
  await fetchTopics();
  startPolling();
});

onUnmounted(() => {
  stopPolling();
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

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>