<template>
    <div class="min-h-screen bg-blue-50">
        <!-- Header section -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                <div>
                    <h1 class="text-3xl font-bold text-blue-600">Kelola Gunung</h1>
                    <p class="mt-1 text-sm text-gray-500">Data gunung untuk pendakian di Indonesia</p>
                </div>
                <div class="flex space-x-3">
                    <button @click="router.push('/dashboard')"
                        class="group inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="-ml-1 mr-2 h-5 w-5 text-gray-500 group-hover:text-gray-600 transition-colors"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Kembali
                    </button>
                    <button @click="openAddMountainModal"
                        class="group inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg class="-ml-1 mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Tambah Gunung
                    </button>
                </div>
            </div>

            <!-- Main content card -->
            <div class="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                <div class="overflow-x-auto">
                    <div v-if="loading" class="py-20 text-center">
                        <div
                            class="inline-block animate-spin h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent">
                        </div>
                        <p class="mt-4 text-sm text-gray-500">Sedang memuat data...</p>
                    </div>
                    <div v-else-if="error" class="py-16 text-center">
                        <svg class="mx-auto h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p class="mt-4 text-red-500 font-medium">{{ error }}</p>
                        <button @click="fetchMountains"
                            class="mt-4 px-4 py-2 text-sm text-blue-500 hover:text-blue-700 font-medium">
                            Coba lagi
                        </button>
                    </div>
                    <div v-else-if="mountains.length === 0" class="py-20 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                        </svg>
                        <p class="mt-4 text-gray-500">Belum ada data gunung.</p>
                        <button @click="openAddMountainModal"
                            class="mt-4 px-4 py-2 text-sm text-blue-500 hover:text-blue-700 font-medium flex items-center mx-auto">
                            <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Tambah Gunung Pertama
                        </button>
                    </div>
                    <table v-else class="min-w-full divide-y divide-gray-200">
                        <thead>
                            
                            <tr class="bg-gray-50">
                                <th scope="col"
                                    class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nama</th>
                                <th scope="col"
                                    class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Lokasi</th>
                                    <th scope="col"
                                    class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Deskripsi</th>
                                <th scope="col"
                                    class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status</th>
                                <th scope="col"
                                    class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Aksi</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-100">
                            <tr v-for="mountain in mountains" :key="mountain.id"
                                class="hover:bg-blue-50 transition duration-150">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden bg-gray-100 mr-4">
                                            <img v-if="mountain.photoUrl" :src="`${apiBaseUrl}${mountain.photoUrl}`" class="h-12 w-12 object-cover" alt="" />
                                            <div v-else class="h-12 w-12 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                                          d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="text-sm font-medium text-gray-900">{{ mountain.name }}</div>
                                            <div class="text-sm text-gray-500">{{ mountain.height }} m</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ mountain.location }}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-gray-900 line-clamp-2">{{ mountain.description }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="{
                                        'px-2 py-1 text-xs font-medium rounded-full': true,
                                        'bg-green-100 text-green-800': mountain.status === 'buka',
                                        'bg-yellow-100 text-yellow-800': mountain.status === 'waspada',
                                        'bg-red-100 text-red-800': mountain.status === 'tutup'
                                    }">
                                        {{ mountain.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <div class="flex space-x-2">
                                        <button @click="editMountain(mountain)" 
                                                class="text-blue-600 hover:text-blue-900">Edit</button>
                                        <button @click="confirmDeleteMountain(mountain)" 
                                                class="text-red-600 hover:text-red-900">Hapus</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Add/Edit Mountain Modal -->
        <div v-if="showMountainFormModal" class="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title"
            role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 backdrop-blur-xl bg-transparent transition-all duration-300 ease-out"
                    aria-hidden="true" @click="showMountainFormModal = false"></div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all duration-300 ease-out sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-100 scale-100 opacity-100">
                    <div class="bg-white px-6 pt-6 pb-5">
                        <div class="sm:flex sm:items-start">
                            <div class="w-full">
                                <div class="flex justify-between items-center pb-5 mb-5 border-b border-gray-100">
                                    <h3 class="text-xl font-semibold text-gray-900 flex items-center">
                                        <span class="bg-blue-100 text-blue-700 rounded-full p-1.5 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                                            </svg>
                                        </span>
                                        {{ editingMountain ? 'Edit Gunung' : 'Tambah Gunung Baru' }}
                                    </h3>
                                    <button @click="showMountainFormModal = false"
                                        class="text-gray-400 hover:text-gray-500 bg-white rounded-full p-1 hover:bg-gray-50 transition-colors">
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <form @submit.prevent="saveMountain" class="space-y-5">
                                    <div>
                                        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nama
                                            Gunung</label>
                                        <input type="text" id="name" v-model="mountainForm.name" required
                                            class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200">
                                    </div>

                                    <div>
                                        <label for="location"
                                            class="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                                        <input type="text" id="location" v-model="mountainForm.location" required
                                            class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200">
                                    </div>

                                    <div>
                                        <label for="height"
                                            class="block text-sm font-medium text-gray-700 mb-1">Ketinggian (m)</label>
                                        <input type="number" id="height" v-model="mountainForm.height" required
                                            class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200">
                                    </div>

                                    <div>
                                        <label for="status"
                                            class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select id="status" v-model="mountainForm.status" required
                                            class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200">
                                            <option value="buka">Buka</option>
                                            <option value="waspada">Waspada</option>
                                            <option value="tutup">Tutup</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label for="description"
                                            class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                        <textarea id="description" v-model="mountainForm.description" rows="4" required
                                            class="block w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"></textarea>
                                    </div>

                                    <div>
    <label for="photo" class="block text-sm font-medium text-gray-700 mb-1">Foto Gunung</label>
    <div class="mt-1 flex items-center space-x-4">
        <div v-if="previewImage || (editingMountain && mountainForm.photoUrl)" 
             class="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
            <img :src="previewImage || (editingMountain ? `${apiBaseUrl}${mountainForm.photoUrl}` : '')" 
                 class="w-full h-full object-cover" />
            <button type="button" @click="removePhoto" 
                    class="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" fill="none" 
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div v-else class="flex items-center justify-center w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors">
            <div class="space-y-1 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-xs text-gray-500">Belum ada foto</p>
            </div>
        </div>
        <div>
            <label for="photo-upload" 
                class="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {{ previewImage || (editingMountain && mountainForm.photoUrl) ? 'Ganti Foto' : 'Unggah Foto' }}
            </label>
            <input id="photo-upload" type="file" @change="handlePhotoChange" ref="photoInput" 
                   accept="image/*" class="sr-only" />
        </div>
    </div>
    <p class="mt-1 text-xs text-gray-500">Format: JPG, PNG, GIF. Maksimum 5 MB.</p>
</div>

                                    <div class="flex justify-end space-x-3 mt-8">
                                        <button type="button" @click="showMountainFormModal = false"
                                            class="inline-flex justify-center px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                                            Batal
                                        </button>
                                        <button type="submit"
                                            class="inline-flex justify-center px-5 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 border border-transparent rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                                            {{ editingMountain ? 'Simpan Perubahan' : 'Tambahkan Gunung' }}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Mountain Confirmation Modal -->
        <div v-if="showDeleteConfirmModal" class="fixed inset-0 z-[1000] overflow-y-auto" aria-labelledby="modal-title"
            role="dialog" aria-modal="true">
            <!-- Backdrop dengan blur -->
            <div class="fixed inset-0 bg-transparant bg-opacity-10 backdrop-filter backdrop-blur-md transition-opacity"
                @click="showDeleteConfirmModal = false"></div>

            <!-- Modal Content -->
            <div class="flex items-center justify-center min-h-screen p-4">
                <div
                    class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto border border-gray-100 z-[1001]">
                    <div class="px-6 pt-6 pb-5">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-12 sm:w-12">
                                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-xl font-semibold text-gray-900 mb-2">Hapus Gunung</h3>
                                <div class="mt-2">
                                    <p class="text-gray-500">
                                        Apakah Anda yakin ingin menghapus gunung "<span
                                            class="font-semibold text-gray-900">{{ mountainToDelete?.name }}</span>"?
                                        Tindakan ini tidak dapat dibatalkan.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 sm:flex sm:flex-row-reverse">
                            <button type="button" @click="deleteMountain"
                                class="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-5 py-3 bg-red-600 text-base font-medium text-white hover:bg-red-700 transition-all duration-200 sm:ml-3 sm:w-auto sm:text-sm">
                                Hapus
                            </button>
                            <button type="button" @click="showDeleteConfirmModal = false"
                                class="mt-3 w-full inline-flex justify-center rounded-xl border border-gray-300 shadow-sm px-5 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
    layout: 'dashboard',
});

const router = useRouter();
const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const showMountainFormModal = ref(false);
const showDeleteConfirmModal = ref(false);
const editingMountain = ref(false);
const mountainToDelete = ref(null);
const mountains = ref([]);
const loading = ref(false);
const error = ref(null);
const photoInput = ref(null);
const photoFile = ref(null);
const previewImage = ref(null);

const mountainForm = ref({
    name: '',
    location: '',
    height: '',
    description: '',
    status: 'buka',
    photoUrl: null
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

const openAddMountainModal = () => {
    editingMountain.value = false;
    mountainForm.value = {
        name: '',
        location: '',
        height: '',
        description: '',
        status: 'buka',
        photoUrl: null
    };
    photoFile.value = null;
    previewImage.value = null;
    showMountainFormModal.value = true;
};

const editMountain = (mountain) => {
    editingMountain.value = true;
    mountainForm.value = { ...mountain };
    photoFile.value = null;
    previewImage.value = null;
    showMountainFormModal.value = true;
};

const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 5MB.');
        if (photoInput.value) photoInput.value.value = '';
        return;
    }
    
    photoFile.value = file;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
};

const removePhoto = () => {
    photoFile.value = null;
    previewImage.value = null;
    if (photoInput.value) photoInput.value.value = '';
    
    if (editingMountain.value && mountainForm.value.photoUrl) {
        if (confirm('Hapus foto yang sudah ada dari gunung ini?')) {
            deleteMountainPhoto(mountainForm.value.id);
        }
    }
};

const deleteMountainPhoto = async (mountainId) => {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`${apiBaseUrl}/api/mountains/${mountainId}/photo`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': token
            }
        });

        if (!response.ok) throw new Error('Failed to delete mountain photo');
        
        mountainForm.value.photoUrl = null;
    } catch (err) {
        console.error('Error deleting mountain photo:', err);
        alert('Gagal menghapus foto gunung. Silakan coba lagi nanti.');
    }
};

const confirmDeleteMountain = (mountain) => {
    mountainToDelete.value = mountain;
    showDeleteConfirmModal.value = true;
};

const saveMountain = async () => {
    const token = localStorage.getItem('token');

    try {
        const url = editingMountain.value
            ? `${apiBaseUrl}/api/mountains/${mountainForm.value.id}`
            : `${apiBaseUrl}/api/mountains`;

        const method = editingMountain.value ? 'PUT' : 'POST';
        
        const formData = new FormData();
        formData.append('name', mountainForm.value.name);
        formData.append('location', mountainForm.value.location);
        formData.append('height', mountainForm.value.height);
        formData.append('description', mountainForm.value.description);
        formData.append('status', mountainForm.value.status);
        
        if (photoFile.value) {
            formData.append('photo', photoFile.value);
        }

        const response = await fetch(url, {
            method,
            headers: {
                'x-auth-token': token
            },
            body: formData
        });

        if (!response.ok) throw new Error('Failed to save mountain');

        await fetchMountains();
        showMountainFormModal.value = false;
    } catch (err) {
        console.error('Error saving mountain:', err);
        alert('Gagal menyimpan data gunung. Silakan coba lagi nanti.');
    }
};

const deleteMountain = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${apiBaseUrl}/api/mountains/${mountainToDelete.value.id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': token
            }
        });

        if (!response.ok) throw new Error('Failed to delete mountain');

        await fetchMountains();
        showDeleteConfirmModal.value = false;
    } catch (err) {
        console.error('Error deleting mountain:', err);
        alert('Gagal menghapus gunung. Silakan coba lagi nanti.');
    }
};

onMounted(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        router.push('/login');
        return;
    }

    try {
        const userResponse = await fetch(`${apiBaseUrl}/api/auth/me`, {
            headers: {
                'x-auth-token': token
            }
        });

        if (!userResponse.ok) {
            throw new Error('Not authenticated');
        }

        const userData = await userResponse.json();
        if (userData.role !== 'admin') {
            router.push('/dashboard');
            return;
        }

        await fetchMountains();
    } catch (err) {
        console.error('Authentication error:', err);
        router.push('/login');
    }
});
</script>