<template>
    <div class="min-h-screen bg-blue-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                <h1 class="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>

                <div class="flex space-x-3">
                    <button @click="router.push('/dashboard')"
                        class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Kembali
                    </button>
                    <button @click="openAddUserModal"
                        class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Tambah Pengguna
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-white rounded-lg shadow p-6 border border-gray-100">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-blue-100 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Total Pengguna</p>
                            <p class="text-2xl font-semibold text-gray-900">{{ users.length }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6 border border-gray-100">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-green-100 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Pengguna Reguler</p>
                            <p class="text-2xl font-semibold text-gray-900">{{users.filter(u => u.role ===
                                'user').length }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-6 border border-gray-100">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-purple-100 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-500">Admin</p>
                            <p class="text-2xl font-semibold text-gray-900">{{users.filter(u => u.role ===
                                'admin').length }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white shadow-sm rounded-lg p-4 mb-6 border border-gray-100">
                <div class="flex flex-col md:flex-row md:items-center md:space-x-4">
                    <div class="relative flex-1 mb-4 md:mb-0">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                        <input v-model="searchQuery" type="text" placeholder="Cari nama atau email..."
                            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div class="flex space-x-2">
                        <select v-model="roleFilter"
                            class="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="all">Semua Peran</option>
                            <option value="user">Pengguna</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button @click="resetFilters"
                            class="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <div class="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                <div v-if="loading" class="p-8 flex justify-center">
                    <div class="flex items-center space-x-2">
                        <div class="animate-spin h-6 w-6 border-4 border-blue-500 rounded-full border-t-transparent">
                        </div>
                        <span class="text-gray-500">Memuat data pengguna...</span>
                    </div>
                </div>

                <div v-else-if="error" class="p-8 text-center text-red-500">
                    {{ error }}
                </div>

                <div v-else-if="filteredUsers.length === 0" class="p-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <h3 class="mt-4 text-lg font-medium text-gray-900">Tidak ada pengguna ditemukan</h3>
                    <p class="mt-1 text-gray-500">
                        {{ searchQuery ? 'Coba ubah filter pencarian Anda' : 'Belum ada pengguna yang terdaftar' }}
                    </p>
                </div>

                <div v-else class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr class="bg-gray-50">
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Pengguna
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Peran
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bergabung Pada
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-100">
                            <tr v-for="user in filteredUsers" :key="user.id"
                                class="hover:bg-blue-50 transition duration-150">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div
                                            class="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                                            {{ getInitials(user.name) }}
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ user.email }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="{
                                        'px-2 py-1 text-xs font-medium rounded-full': true,
                                        'bg-green-100 text-green-800': user.role === 'user',
                                        'bg-purple-100 text-purple-800': user.role === 'admin'
                                    }">
                                        {{ user.role === 'admin' ? 'Admin' : 'Pengguna' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ formatDate(user.createdAt) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <div class="flex space-x-3">
                                        <button @click="editUser(user)" class="text-blue-600 hover:text-blue-900">
                                            Edit
                                        </button>
                                        <button @click="confirmDeleteUser(user)" class="text-red-600 hover:text-red-900"
                                            :disabled="user.id === currentUserId">
                                            {{ user.id === currentUserId ? 'Akun Aktif' : 'Hapus' }}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div v-if="showUserFormModal" class="fixed inset-0 z-[1000] overflow-y-auto" aria-labelledby="modal-title"
            role="dialog" aria-modal="true">
            <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity bg-gray-500/70 backdrop-blur-sm" aria-hidden="true"
                    @click="showUserFormModal = false"></div>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div
                    class="relative inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-2xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {{ editingUser ? 'Edit Pengguna' : 'Tambah Pengguna Baru' }}
                                </h3>
                                <div class="mt-4">
                                    <form @submit.prevent="saveUser">
                                        <div class="space-y-4">
                                            <div>
                                                <label for="name"
                                                    class="block text-sm font-medium text-gray-700">Nama</label>
                                                <input v-model="userForm.name" type="text" id="name"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    required />
                                            </div>

                                            <div>
                                                <label for="email"
                                                    class="block text-sm font-medium text-gray-700">Email</label>
                                                <input v-model="userForm.email" type="email" id="email"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    required />
                                            </div>

                                            <div>
                                                <label for="role"
                                                    class="block text-sm font-medium text-gray-700">Peran</label>
                                                <select v-model="userForm.role" id="role"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                                    <option value="user">Pengguna</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>

                                            <div v-if="!editingUser">
                                                <label for="password"
                                                    class="block text-sm font-medium text-gray-700">Password</label>
                                                <input v-model="userForm.password" type="password" id="password"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    required />
                                            </div>

                                            <div v-if="!editingUser">
                                                <label for="confirmPassword"
                                                    class="block text-sm font-medium text-gray-700">Konfirmasi
                                                    Password</label>
                                                <input v-model="userForm.confirmPassword" type="password"
                                                    id="confirmPassword"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    required />
                                            </div>

                                            <div v-if="editingUser">
                                                <div class="flex items-center justify-between">
                                                    <label for="newPassword"
                                                        class="block text-sm font-medium text-gray-700">Password Baru
                                                        (opsional)</label>
                                                </div>
                                                <input v-model="userForm.newPassword" type="password" id="newPassword"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                            </div>
                                        </div>

                                        <div class="flex justify-end space-x-3 mt-8">
                                            <button type="button" @click="showUserFormModal = false"
                                                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                Batal
                                            </button>
                                            <button type="submit"
                                                class="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                {{ editingUser ? 'Simpan Perubahan' : 'Tambah Pengguna' }}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showDeleteConfirmModal" class="fixed inset-0 z-[1000] overflow-y-auto" aria-labelledby="modal-title"
            role="dialog" aria-modal="true">
            <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity bg-gray-500/70 backdrop-blur-sm" aria-hidden="true"
                    @click="showDeleteConfirmModal = false"></div>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div
                    class="relative inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-2xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Hapus Pengguna
                                </h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        Apakah Anda yakin ingin menghapus pengguna <span class="font-medium">{{
                                            userToDelete?.name }}</span>? Tindakan ini tidak dapat dibatalkan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" @click="deleteUser"
                            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Hapus
                        </button>
                        <button type="button" @click="showDeleteConfirmModal = false"
                            class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Batal
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

const users = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const roleFilter = ref('all');
const showUserFormModal = ref(false);
const showDeleteConfirmModal = ref(false);
const editingUser = ref(false);
const userToDelete = ref(null);
const currentUserId = ref(null);

const userForm = ref({
    name: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: '',
    newPassword: ''
});

const filteredUsers = computed(() => {
    let result = [...users.value];

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
    }

    if (roleFilter.value !== 'all') {
        result = result.filter(user => user.role === roleFilter.value);
    }

    return result;
});

const fetchUsers = async () => {
    loading.value = true;
    error.value = null;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiBaseUrl}/api/users`, {
            headers: {
                'x-auth-token': token
            }
        });

        if (!response.ok) throw new Error('Failed to fetch users');

        const data = await response.json();
        users.value = data;
    } catch (err) {
        console.error('Error fetching users:', err);
        error.value = 'Gagal memuat data pengguna. Silakan coba lagi nanti.';
    } finally {
        loading.value = false;
    }
};

const resetFilters = () => {
    searchQuery.value = '';
    roleFilter.value = 'all';
};

const openAddUserModal = () => {
    editingUser.value = false;
    userForm.value = {
        name: '',
        email: '',
        role: 'user',
        password: '',
        confirmPassword: '',
        newPassword: ''
    };
    showUserFormModal.value = true;
};

const editUser = (user) => {
    editingUser.value = true;
    userForm.value = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        newPassword: ''
    };
    showUserFormModal.value = true;
};

const confirmDeleteUser = (user) => {
    if (user.id === currentUserId.value) return;

    userToDelete.value = user;
    showDeleteConfirmModal.value = true;
};

const saveUser = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!editingUser.value && userForm.value.password !== userForm.value.confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok');
            return;
        }

        const url = editingUser.value
            ? `${apiBaseUrl}/api/users/${userForm.value.id}`
            : `${apiBaseUrl}/api/users`;

        const method = editingUser.value ? 'PUT' : 'POST';

        const data = {
            name: userForm.value.name,
            email: userForm.value.email,
            role: userForm.value.role
        };

        if (!editingUser.value) {
            data.password = userForm.value.password;
        } else if (userForm.value.newPassword) {
            data.password = userForm.value.newPassword;
        }

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(data)
        });

        const contentType = response.headers.get('content-type');
        let errorMessage = 'Gagal menyimpan data pengguna. Silakan coba lagi nanti.';

        if (!response.ok) {
            if (contentType && contentType.includes('application/json')) {
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (parseError) {
                    console.error('Error parsing error response:', parseError);
                    const textResponse = await response.text();
                    console.error('Raw error response:', textResponse);
                    errorMessage = `Error ${response.status}: ${textResponse.substring(0, 100)}`;
                }
            } else {
                const textResponse = await response.text();
                console.error('Non-JSON error response:', textResponse);
                errorMessage = `Server error (${response.status})`;
            }
            throw new Error(errorMessage);
        }

        await fetchUsers();
        showUserFormModal.value = false;
    } catch (err) {
        console.error('Error saving user:', err);
        alert(err.message || 'Gagal menyimpan data pengguna. Silakan coba lagi nanti.');
    }
};

const deleteUser = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${apiBaseUrl}/api/users/${userToDelete.value.id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': token
            }
        });

        if (!response.ok) {
            try {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete user');
            } catch (parseError) {
                const textResponse = await response.text();
                throw new Error(`Error ${response.status}: ${textResponse.substring(0, 100)}`);
            }
        }

        await fetchUsers();
        showDeleteConfirmModal.value = false;
    } catch (err) {
        console.error('Error deleting user:', err);
        alert(err.message || 'Gagal menghapus pengguna. Silakan coba lagi nanti.');
    }
};

const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const getInitials = (name) => {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
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

        currentUserId.value = userData.id;

        await fetchUsers();
    } catch (err) {
        console.error('Authentication error:', err);
        router.push('/login');
    }
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
</style>