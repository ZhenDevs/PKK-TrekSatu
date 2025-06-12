<template>
  <div>
    <section class="relative">
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Mountain peak" 
          class="w-full h-screen object-cover"
        />
        <div class="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div class="relative z-10 flex items-center justify-center h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Trek<span class="text-primary">Satu</span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
            Tracking Satu Gunung untuk Semua
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/mountains" class="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-md transition duration-300">
              Jelajahi Gunung
            </NuxtLink>
            <NuxtLink to="/forum" class="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-8 rounded-md border border-white/30 transition duration-300">
              Gabung Komunitas
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mengapa Mendaki Bersama Kami</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">Temukan keindahan gunung dengan keamanan dan dukungan komunitas</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
         
          
          <div class="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3 text-center">Keamanan Utama</h3>
            <p class="text-gray-600 text-center">
              Rekomendasi peralatan untuk setiap pendakian.
            </p>
          </div>
          
          <div class="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3 text-center">Komunitas Aktif</h3>
            <p class="text-gray-600 text-center">
              Terhubung dengan sesama pendaki, berbagi pengalaman, dan rencanakan ekspedisi kelompok dengan forum komunitas kami.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center gap-12">
          <div class="md:w-1/2">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Bergabung dengan Komunitas Pendaki Kami</h2>
            <p class="text-lg text-gray-700 mb-8">
              Terhubung dengan ribuan pendaki bersemangat dari seluruh dunia. Bagikan pengalaman, ajukan pertanyaan, dan temukan mitra pendakian untuk ekspedisi berikutnya.
            </p>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Obrolan langsung dengan pendaki berpengalaman</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Forum khusus untuk gunung dan wilayah berbeda</span>
              </li>
              <li class="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700">Temukan mitra pendakian dan atur ekspedisi kelompok</span>
              </li>
            </ul>
            <NuxtLink to="/forum" class="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-md transition duration-300">
              Jelajahi Forum
            </NuxtLink>
          </div>
          <div class="md:w-1/2 mt-10 md:mt-0">
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
              <div class="bg-gray-800 px-6 py-4">
                <h3 class="text-white font-medium">Chat Pendaki Gunung</h3>
              </div>
              <div class="p-6">
                <div class="space-y-4">
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span class="font-medium text-primary">AD</span>
                    </div>
                    <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p class="text-sm font-medium text-gray-700">Akbar Disini</p>
                      <p class="text-gray-600">Ada yang baru di Gunung Semeru? Bagaimana kondisinya?</p>
                      <p class="text-xs text-gray-400 mt-1">2 jam yang lalu</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-3 justify-end">
                    <div class="bg-primary/10 rounded-lg p-3 max-w-xs">
                      <p class="text-sm font-medium text-primary">Anda</p>
                      <p class="text-gray-600">Saya di sana akhir pekan lalu. Cuacanya sempurna, tapi bawa jaket lebih!</p>
                      <p class="text-xs text-gray-400 mt-1">1 jam yang lalu</p>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span class="font-medium text-primary">ME</span>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <span class="font-medium text-green-600">DC</span>
                    </div>
                    <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p class="text-sm font-medium text-gray-700">Dhani Cargloss</p>
                      <p class="text-gray-600">Terima kasih infonya! Ada yang tertarik untuk pendakian kelompok bulan depan?</p>
                      <p class="text-xs text-gray-400 mt-1">30 menit yang lalu</p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 pt-4 border-t border-gray-200">
                  <div class="flex gap-2">
                    <input type="text" placeholder="Ketik pesan..." class="flex-1 bg-gray-100 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50" disabled />
                    <button class="bg-primary text-white p-2 rounded-md" disabled>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </div>
                  <p class="text-xs text-center text-gray-500 mt-2">Gabung forum untuk berpartisipasi dalam diskusi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-900 relative">
      <div class="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80" 
          alt="Mountain background" 
          class="w-full h-full object-cover"
        />
      </div>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Siap Memulai Perjalanan Pendakian Anda?</h2>
          <p class="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Bergabunglah dengan ribuan pendaki yang telah menemukan gunung dan teman pendakian sempurna melalui platform kami.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/register" class="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-md transition duration-300">
              Daftar Sekarang
            </NuxtLink>
            <NuxtLink to="/mountains" class="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-10 rounded-md border border-white/30 transition duration-300">
              Jelajahi Gunung
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default"
});
</script>